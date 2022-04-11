const Joi = require("joi");

module.exports = comment => {
    const schema = Joi.object({
        CommentId: Joi.number().min(1).required(),
        Stage: Joi.string().valid("ACCEPTED", "REJECTED").required()
    });
    return schema.validate(comment);
};