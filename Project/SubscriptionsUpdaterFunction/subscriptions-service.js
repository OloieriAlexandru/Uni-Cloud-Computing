const Utils = require('./utils');

class SubscriptionsService {
    constructor(usersService, subscriptionsRepository) {
        this.usersService = usersService;
        this.subscriptionsRepository = subscriptionsRepository;
    }

    updateSubscriptions = async (req, res, force) => {
        let subscriptions = await this.subscriptionsRepository.getAllActive();
        let getDate = Utils.getUTCDate(3);
        let dateMiliseconds = getDate.getTime();
        let updatedSubscriptions = 0;
        for (let subscription of subscriptions) {
            let expirationDateMiliseconds = subscription.subscriptionEndDate.getTime();
            if (dateMiliseconds > expirationDateMiliseconds || force) {
                if (!this.usersService.changeUserType('basic', subscription.email)) {
                    console.log("Failed to change the subscription type to 'basic' for user " + subscription.email);
                    continue;
                }

                subscription.status = 'expired';
                this.subscriptionsRepository.save(subscription);

                ++updatedSubscriptions;
            }
        }

        return res.status(200).send(Utils.buildBody('Ok!', {
            'updatedSubscriptions': updatedSubscriptions
        }));
    }
};

module.exports = SubscriptionsService;
