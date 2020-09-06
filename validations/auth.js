const Joi = require('joi');

module.exports = function (requestBody) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(requestBody, {
        abortEarly: false
    });
}