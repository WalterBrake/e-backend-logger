const jwt = require('jsonwebtoken');
const config = require('../config/')
//get model
const Authorization = require('../models/Authorization');

//Middleware for verify authenticaation
module.exports.isAuthenticated = function (req, res, next) {
    var token = req.headers.authorization
    if (token) {

        // verifies secret and checks if the token is expired
        jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, function (err, decoded) {
            if (err) {
                return res.status(401).json({ message: 'unauthorized-1' })
            } else {
                //find the token in the database
                Authorization.findOne({ token: token.replace(/^Bearer\s/, '') }, function (err, authorization) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error getting record.'
                        });
                    }
                    if (!authorization) {
                        return res.status(401).json({ message: 'unauthorized' })
                    }
                    return next();
                });
            }
        });
    }
    else {
        return res.status(401).json({ message: 'unauthorized' })
    }
}