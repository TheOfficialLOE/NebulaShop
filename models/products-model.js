
const Joi = require("joi");

module.exports = {
    product: product => {
        const schema = Joi.object({
            Brand: Joi.string().min(3).max(20).required(),
            Name: Joi.string().min(10).max(200).required(),
            Description: Joi.string().min(10).max(1000).required(),
            Info: Joi.object().required(),
            Remaining: Joi.number().min(0).required()
        });
        return schema.validate(product);
    },
    brand: brand => {
        const schema = Joi.object({
            Name: Joi.string().min(3).max(20).required(),
            Details: Joi.string().min(10).max(255).required()
        });
        return schema.validate(brand);
    }
};