const jwtDecode = require('jwt-decode');

const requestSchema = require('./request-model');

class Validator {

    validateBody(req, res) {
        if (req.body === undefined) {
            return res.status(400).end(JSON.stringify({
                'message': 'Bad Request!'
            }));
        }
        const {
            error,
            value
        } = requestSchema.validate(req.body);

        if (error) {
            return res.status(400).end(JSON.stringify(error.details));
        }

        return null;
    }

    validateHeader(req, res) {
        let headerStr = req.header('Authorization');
        if (!headerStr) {
            return res.status(400).end(JSON.stringify({
                'message': 'Missing Authorization header!'
            }));
        }
        if (!headerStr.startsWith('Bearer ')) {
            return res.status(400).end(JSON.stringify({
                'message': 'Invalid Authorization header value!'
            }));
        }
        let token = headerStr.substring(7);
        let decodedJwt = null;
        try {
            decodedJwt = jwtDecode(token);
        } catch (e) {
            return res.status(400).end(JSON.stringify({
                'message': 'Invalid Token string!'
            }));
        }
        if (decodedJwt == null || !decodedJwt.hasOwnProperty('email')) {
            return res.status(400).end(JSON.stringify({
                'message': 'Invalid Token object!'
            }));
        }
        return null;
    }
};

module.exports = Validator;
