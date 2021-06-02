const jwtDecode = require('jwt-decode');

const chargeModelValidator = require('./charge-model-validator');

function buildBody(message) {
    return JSON.stringify({
        'message': message
    });
}

class Validator {

    validateChargeBody(req, res) {
        if (!req || !req.body) {
            return res.status(400).end(buildBody('The body is missing!'));
        }
        const {
            error,
            value
        } = chargeModelValidator.validate(req.body);

        if (error) {
            return res.status(400).end(JSON.stringify(error));
        }
        return null;
    }

    validateAuthorizationHeader(req, res) {
        let headerStr = req.header('Authorization');
        if (!headerStr) {
            return res.status(400).end(buildBody('Missing Authorization header!'));
        }
        if (!headerStr.startsWith('Bearer ')) {
            return res.status(400).end(buildBody('Invalid Authorization header value!'));
        }
        let token = headerStr.substring(7);
        let decodedJwt = null;
        try {
            decodedJwt = jwtDecode(token);
        } catch (e) {
            return res.status(400).end(buildBody('Invalid Token string!'));
        }
        if (decodedJwt == null || !decodedJwt.hasOwnProperty('email')) {
            return res.status(400).end(buildBody('Invalid Token object!'));
        }
        return null;
    }
};

module.exports = Validator;
