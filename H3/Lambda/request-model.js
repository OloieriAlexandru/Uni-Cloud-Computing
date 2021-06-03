const Joi = require('joi')

module.exports = Joi.object({
    'problemId': Joi.number().required(),
    'programmingLanguage': Joi.string().required().valid("C++", "Python", "C"),
    'sourceCode': Joi.string().required().max(10000),
}).options({
    abortEarly: false
});
