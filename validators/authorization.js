'use strict';

const Joi = require('joi')

const schemas = {
    create: Joi.object().keys({
        application_id: Joi.string().required(),
    }),
    update: Joi.object().keys({
        application_id: Joi.string(),
    }),
};
module.exports = schemas;