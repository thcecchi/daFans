'use strict';

var _ = require('lodash');
var Raider = require('./raider.model');

// Get list of raiders
exports.index = function(req, res) {
  Raider.find(function (err, raiders) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(raiders);
  });
};

// Get a single raider
exports.show = function(req, res) {
  Raider.findById(req.params.id, function (err, raider) {
    if(err) { return handleError(res, err); }
    if(!raider) { return res.status(404).send('Not Found'); }
    return res.json(raider);
  });
};

// Creates a new raider in the DB.
exports.create = function(req, res) {
  Raider.create(req.body, function(err, raider) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(raider);
  });
};

// Updates an existing raider in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Raider.findById(req.params.id, function (err, raider) {
//     if (err) { return handleError(res, err); }
//     if(!raider) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(raider, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(raider);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Raider.findOne({_id: req.params.id}, function (err, raider){
       if (err) {
          res.send(422,'update failed');
       } else {
          raider.replies = req.body.replies;
          raider.save();
       }
    });
};

// Deletes a raider from the DB.
exports.destroy = function(req, res) {
  Raider.findById(req.params.id, function (err, raider) {
    if(err) { return handleError(res, err); }
    if(!raider) { return res.status(404).send('Not Found'); }
    raider.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
