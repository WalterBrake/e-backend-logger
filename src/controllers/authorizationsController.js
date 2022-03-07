//Get the model
const Authorization = require('../models/Authorization');

const config = require('../config/')
const jwt = require('jsonwebtoken');
const Aplication = require('../models/Aplication');


// Get all
module.exports.list = function (req, res) {
    Authorization.find({}, function (err, authorizations) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting records.'
            });
        }
        return res.json(authorizations);
    });
}


// Get one
module.exports.show = function (req, res) {
    var id = req.params.id;
    Authorization.findOne({ _id: id }, function (err, authorization) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting record.'
            });
        }
        if (!authorization) {
            return res.status(404).json({
                message: 'No such record'
            });
        }
        return res.json(authorization);
    });
}


// Create
module.exports.create = [
    function (req, res) {


        //find the aplication record
        Aplication.findById(req.body.application_id, function (err, aplication) {
            if (err) {
                return res.status(500).json({
                    message: 'Error getting aplication, not found.'
                });
            }
            if (!aplication) {
                return res.status(401).json({ message: 'Error getting aplication, not found.' })
            }

            // initialize record
            var authorization = new Authorization({
                application_id: aplication._id,
                token: jwt.sign({ application_id: req.body.application_id }, config.authSecret),
                created_at: new Date(),
                updated_at: new Date(),
            })

            // save record
            authorization.save(function (err, authorization) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving record',
                        error: err
                    });
                }
                return res.json({
                    message: 'saved',
                    _id: authorization._id
                });
            })
        });



    }
]

// Update
module.exports.update = [
    function (req, res) {

        var id = req.params.id;
        //find the aplication record
        Authorization.findOne
            ({ _id: id }, async function (err, authorization) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving record',
                        error: err
                    });
                }
                if (!authorization) {
                    return res.status(404).json({
                        message: 'No such record'
                    });
                }

                // update record
                if (req.body.application_id) {

                    try {
                        //find the token in the database
                        let response = await Aplication.findById(req.body.application_id)
                        console.log(response)
                        if (!response) {
                            return res.status(401).json({ message: 'Error getting aplication, not found.' })
                        }

                        authorization.application_id = response._id;
                    } catch (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: 'Error getting aplication, not found. 500'
                        });

                    }

                } else {
                    authorization.application_id = authorization.application_id;
                }
                authorization.updated_at = new Date();
                // save record
                authorization.save(function (err, authorization) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error getting record.'
                        });
                    }
                    if (!authorization) {
                        return res.status(404).json({
                            message: 'No such record'
                        });
                    }
                    return res.json(authorization);
                });
            });
    }

]


// Delete
module.exports.delete = function (req, res) {
    var id = req.params.id;
    Authorization.findByIdAndRemove(id, function (err, authorization) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting record.'
            });
        }
        return res.json({
            message: 'Record deleted.'
        });
    });
}