'use strict';

var _ = require('lodash');
var Jaguar = require('./jaguar.model');

// Get list of jaguars
exports.index = function(req, res) {
  Jaguar.find(function (err, jaguars) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(jaguars);
  });
};

// Get a single jaguar
exports.show = function(req, res) {
  Jaguar.findById(req.params.id, function (err, jaguar) {
    if(err) { return handleError(res, err); }
    if(!jaguar) { return res.status(404).send('Not Found'); }
    return res.json(jaguar);
  });
};

// Creates a new jaguar in the DB.
exports.create = function(req, res) {
  Jaguar.create(req.body, function(err, jaguar) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(jaguar);
  });
};

// Updates an existing jaguar in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Jaguar.findById(req.params.id, function (err, jaguar) {
//     if (err) { return handleError(res, err); }
//     if(!jaguar) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(jaguar, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(jaguar);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Jaguar.findOne({_id: req.params.id}, function (err, jaguar){
       if (err) {
          res.send(422,'update failed');
       } else {
          jaguar.replies = req.body.replies;
          jaguar.save();
       }
    });
};

// Deletes a jaguar from the DB.
exports.destroy = function(req, res) {
  Jaguar.findById(req.params.id, function (err, jaguar) {
    if(err) { return handleError(res, err); }
    if(!jaguar) { return res.status(404).send('Not Found'); }
    jaguar.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
