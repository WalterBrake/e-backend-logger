const Aplication = require('../models/Aplication');

var mongoose = require('mongoose');


// Get all
module.exports.list = function (req, res, next) {
    Aplication.find({}, function (err, aplications) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting records.'
            });
        }
        return res.json(aplications);
    });
}


// Get one
module.exports.show = function (req, res) {
    var id = req.params.id;
    Aplication.findOne({ _id: id }, function (err, aplication) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting record.'
            });
        }
        if (!aplication) {
            return res.status(404).json({
                message: 'No such record'
            });
        }
        return res.json(aplication);
    });
}


// Create
module.exports.create = [
    function (req, res) {

        // initialize record
        var aplication = new Aplication({

            name: req.body.name,
            created_at: new Date(),
            updated_at: new Date(),
        })

        // save record
        aplication.save(function (err, aplication) {
            if (err) {
                return res.status(500).json({
                    message: 'Error saving record',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: aplication._id
            });
        })
    }
]

// Update
module.exports.update = [
    function (req, res) {

        var id = req.params.id;
        Aplication.findOne({ _id: id }, function (err, aplication) {
            if (err) {
                return res.status(500).json({
                    message: 'Error saving record',
                    error: err
                });
            }
            if (!aplication) {
                return res.status(404).json({
                    message: 'No such record'
                });
            }

            // update record


            aplication.name = req.body.name ? req.body.name : aplication.name;
            aplication.updated_at = new Date();

            // save record
            aplication.save(function (err, aplication) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error getting record.'
                    });
                }
                if (!aplication) {
                    return res.status(404).json({
                        message: 'No such record'
                    });
                }
                return res.json(aplication);
            });
        });
    }

]


// Delete
module.exports.delete = function (req, res) {
    var id = req.params.id;
    Aplication.findByIdAndRemove(id, function (err, aplication) {
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