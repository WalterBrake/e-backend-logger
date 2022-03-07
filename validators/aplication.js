'use strict';

const Joi = require('joi')

const schemas = {
    create: Joi.object().keys({
        name: Joi.string().required(),
    }),
    update: Joi.object().keys({
        name: Joi.string(),
    }),
};
module.exports = schemas;