'use strict';

// schemas.js 
const Joi = require('joi')

console.log(new Date())
const schemas = {
    create: Joi.object().keys({
        name: Joi.string().required(),
    }),
    update: Joi.object().keys({
        name: Joi.string().required(),
    }),
};
module.exports = schemas;