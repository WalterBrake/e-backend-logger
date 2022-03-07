'use strict';

// schemas.js 
const Joi = require('joi')

console.log(new Date())
const schemas = {
    create: Joi.object().keys({
        application_id: Joi.number().required(),
        type: Joi.string().required().valid('error','info','highest'),
        priority: Joi.string().required().valid('lowest', 'low', 'medium', 'high', 'highest'),
        path: Joi.string().required(),
        message: Joi.string().required(),
        request: Joi.string().required(),
        response: Joi.string().required(),
        created_at: Joi.date().required(),
        updated_at: Joi.date().required(),
    }),
    update: Joi.object().keys({
        application_id: Joi.number().required(),
        type: Joi.string().required().valid('error','info','highest'),
        priority: Joi.string().required().valid('lowest', 'low', 'medium', 'high', 'highest'),
        path: Joi.string().required(),
        message: Joi.string().required(),
        request: Joi.string().required(),
        response: Joi.string().required(),
        created_at: Joi.date().required(),
        updated_at: Joi.date().required(),
    }),
};
module.exports = schemas;