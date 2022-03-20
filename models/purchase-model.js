const Joi = require("joi");

module.exports = item => {
    const schema = Joi.object({
        ProductId: Joi.number().min(1).required(),
        Count: Joi.number().min(1).required(),
        Address: Joi.string().min(10).max(255).required()
    });
    return schema.validate(item);
}