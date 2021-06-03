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
}

module.exports = Validator;
