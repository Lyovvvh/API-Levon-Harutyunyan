import Joi from "joi";

export default{
    create: Joi.object({
        title: Joi.string().min(3).alphanum().max(50).required(),
        description: Joi.string().min(1).required(),
        userId: Joi.string().min(1).required(),
    }),
    getList: Joi.object({
        userId: Joi.string().min(1)
    }),
    getTask: Joi.object({
        id: Joi.string().min(1).required()
    }),
    update: Joi.object({
        title: Joi.string().min(3).alphanum().max(50),
        description: Joi.string().min(1),
        id: Joi.string().min(1).required(),
    }),
    delete: Joi.object({
        id: Joi.string().min(1).required(),
    }),
}