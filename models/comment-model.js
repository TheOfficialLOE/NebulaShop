const Joi = require("joi");

module.exports = comment => {
    const schema = Joi.object({
        ProductId: Joi.number().min(1).required(),
        Text: Joi.string().min(10).max(1000).required()
    });
    return schema.validate(comment);
}