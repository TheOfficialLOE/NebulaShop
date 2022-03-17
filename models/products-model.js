
const Joi = require("joi");

module.exports = {
    product: product => {
        const schema = Joi.object({

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