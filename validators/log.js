'use strict';

const Joi = require('joi')

const schemas = {
    create: Joi.object().keys({
        application_id: Joi.string().required(),
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
        application_id: Joi.string(),
        type: Joi.string().valid('error','info','highest'),
        priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest'),
        path: Joi.string(),
        message: Joi.string(),
        request: Joi.string(),
        response: Joi.string(),
        created_at: Joi.date(),
        updated_at: Joi.date(),
    }),
};
module.exports = schemas;