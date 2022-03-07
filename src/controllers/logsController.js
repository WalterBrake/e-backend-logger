//Get the model
const Aplication = require('../models/Aplication');
const Log = require('../models/Log');

var mongoose = require('mongoose');


// Get all
module.exports.list = function (req, res, next) {
  Log.find({}, function (err, logs) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting records.'
      });
    }
    return res.json(logs);
  });
}


// Get one
module.exports.show = function (req, res) {
  var id = req.params.id;
  Log.findOne({ _id: id }, function (err, log) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.'
      });
    }
    if (!log) {
      return res.status(404).json({
        message: 'No such record'
      });
    }
    return res.json(log);
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
      var log = new Log({
        application_id: aplication._id,
        type: req.body.type,
        priority: req.body.priority,
        path: req.body.path,
        message: req.body.message,
        request: req.body.request,
        response: req.body.response,
        created_at: new Date(),
        updated_at: new Date(),
      })
      // save record
      log.save(function (err, log) {
        if (err) {
          return res.status(500).json({
            message: 'Error saving record',
            error: err
          });
        }
        return res.json({
          message: 'saved',
          _id: log._id
        });
      })
    });
  }
]

// Update
module.exports.update = [
  function (req, res) {

    var id = req.params.id;
    Log.findOne({ _id: id }, async function (err, log) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err
        });
      }
      if (!log) {
        return res.status(404).json({
          message: 'No such record'
        });
      }
      // update record
      if (req.body.application_id) {

        try {
          //find the aplication record
          let response = await Aplication.findById(req.body.application_id)
          console.log(response)
          if (!response) {
            return res.status(401).json({ message: 'Error getting aplication, not found.' })
          }
          log.application_id = response._id;
        } catch (err) {
          console.log(err)
          return res.status(500).json({
            message: 'Error getting aplication, not found. 500'
          });
        }
      } else {
        log.application_id = log.application_id;
      }
      // update record
      log.type = req.body.type ? req.body.type : log.type;
      log.priority = req.body.priority ? req.body.priority : log.priority;
      log.path = req.body.path ? req.body.path : log.path;
      log.message = req.body.message ? req.body.message : log.message;
      log.request = req.body.request ? req.body.request : log.request;
      log.response = req.body.response ? req.body.response : log.response;
      log.updated_at = new Date();

      // save record
      log.save(function (err, log) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting record.'
          });
        }
        if (!log) {
          return res.status(404).json({
            message: 'No such record'
          });
        }
        return res.json(log);
      });
    });
  }

]


// Delete
module.exports.delete = function (req, res) {
  var id = req.params.id;
  Log.findByIdAndRemove(id, function (err, log) {
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