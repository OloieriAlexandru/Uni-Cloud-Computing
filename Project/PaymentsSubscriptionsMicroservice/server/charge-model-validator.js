const Joi = require('joi');

module.exports = Joi.object({
    'amount': Joi.number().required(),
    'email': Joi.string().email().required(),
    'stripeToken': Joi.string().required()
}).options({
    abortEarly: false
});
