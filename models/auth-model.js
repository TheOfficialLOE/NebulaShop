
const Joi = require("joi");

module.exports = {
    registration: user => {
        const schema = Joi.object({
            Email: Joi.string().min(5).max(100).required().email(),
            Password: Joi.string().min(5).max(20).required()
        });
        return schema.validate(user);
    },
    login: user => {
        const schema = Joi.object({
            Email: Joi.string().min(5).max(100).required().email(),
            Password: Joi.string().min(5).max(20).required()
        });
        return schema.validate(user);
    }
};