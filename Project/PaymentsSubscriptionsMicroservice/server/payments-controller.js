const Validator = require('./validator');
const Utils = require('./utils');

class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }

    charge = async (req, res) => {
        let validator = new Validator();
        let bodyValidation = validator.validateChargeBody(req, res);
        if (bodyValidation) {
            return bodyValidation;
        }
        let authValidation = validator.validateAuthorizationHeader(req, res);
        if (authValidation) {
            return authValidation;
        }

        let chargeObj = {
            'email': req.body.email,
            'amount': req.body.amount,
            'stripeToken': req.body.stripeToken
        };
        let token = Utils.extractJwt(req, res);
        let chargeResult = await this.paymentsService.charge(chargeObj, token, req, res);
        if (chargeResult) {
            return chargeResult;
        }

        return res.status(200).end(JSON.stringify({}));
    }
}

module.exports = PaymentsController;
