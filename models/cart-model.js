const Joi = require("joi");


module.exports = item => {
    const schema = Joi.object({
        ProductId: Joi.number().min(1).required(),
        Count: Joi.number().min(1).required()
    });
    return schema.validate(item);
}