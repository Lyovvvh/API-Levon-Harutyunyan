import Joi from 'joi';

export default {
    register: Joi.object({
        name: Joi.string().min(3).alphanum().max(50).required(),
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().min(6).max(30).required(),
    }),
    login: Joi.object({
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().min(6).max(30).required(),
    }),
    getProfile: Joi.object({
        id: Joi.string().min(1).required(),
    }),
    updateProfile: Joi.object({
        id: Joi.string().min(1).required(),
        username: Joi.string().min(3).alphanum().max(50),
        email: Joi.string().email({minDomainSegments: 2}),
        password: Joi.string().min(6).max(30),
    }),
    deleteProfile: Joi.object({
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().min(6).max(30).required(),
    }),


}