const fs = require('fs');
const Stripe = require('stripe');

const Utils = require('./utils');

class PaymentsService {
    constructor(subscriptionsRepository, usersService, config) {
        this.config = config;
        this.subscriptionsRepository = subscriptionsRepository;
        this.usersService = usersService;
        this.stripePrivateKey = fs.readFileSync(config.stripePrivateKeyPath).toString().toString().replace(/(\r\n|\n|\r)/gm, "");

        this.stripe = new Stripe(this.stripePrivateKey);
    }

    async charge(chargeObj, token, req, res) {
        if (chargeObj.email !== token.email) {
            return res.status(403).end(Utils.buildBody('You\'re not allowed to do this!'));
        }
        if (token.role !== 'basic') {
            return res.status(400).end(Utils.buildBody('You have to be a basic user in order to get a premium subscription!'));
        }

        let email = chargeObj.email;
        let stripeToken = chargeObj.stripeToken;
        let amount = chargeObj.amount;
        let subscription = await this.subscriptionsRepository.get(email);

        if (subscription) {
            return res.status(400).end(Utils.buildBody('You already have a subscription!'));
        }

        let payResult = await this.pay(email, stripeToken, amount);
        if (!payResult) {
            return res.status(400).end(Utils.buildBody('Payment error!'));
        }

        let changeTypeResult = await this.usersService.changeUserType('premium', email);
        if (!changeTypeResult) {
            return res.status(500).end(Utils.buildBody('Error while updating the subscription information! Try again later!'));
        }

        let subscriptionType = amount == 10 ? "monthly" : "yearly";
        let subscriptionDays = amount == 10 ? 30 : 365;

        let subscriptionStartDate = new Date();
        let subscriptionEndDate = new Date(subscriptionStartDate);
        subscriptionEndDate.setDate(subscriptionEndDate.getDate() + subscriptionDays);

        let subscriptionObj = {
            email: email,
            type: subscriptionType,
            subscriptionStartDate: subscriptionStartDate,
            subscriptionEndDate: subscriptionEndDate,
            subscriptionStartDateFormatted: Utils.formatDate(subscriptionStartDate),
            subscriptionEndDateFormatted: Utils.formatDate(subscriptionEndDate),
            status: 'active'
        };
        let subscriptionCreateResult = await this.subscriptionsRepository.create(subscriptionObj);
        if (subscriptionCreateResult) {
            return res.status(500).end(Utils.buildBody('Error while updating the subscription information! Try again later!'));
        }

        return null;
    }

    async pay(email, stripeToken, amount) {
        try {
            let customer = await this.stripe.customers.create({
                name: 'Payments-Microservice',
                email: email,
                source: stripeToken
            });
            await this.stripe.charges.create({
                amount: amount * 100,
                currency: "usd",
                customer: customer.id
            });
            return true;
        } catch (e) {
            return null;
        }
    }
};

module.exports = PaymentsService;
