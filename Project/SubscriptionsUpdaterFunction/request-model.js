const Joi = require('joi')

module.exports = Joi.object({
    'force': Joi.alternatives().try(Joi.string().valid('true', 'false'), Joi.boolean()).required()
}).options({
    abortEarly: false
});
