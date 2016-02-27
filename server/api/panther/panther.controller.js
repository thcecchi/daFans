'use strict';

var _ = require('lodash');
var Panther = require('./panther.model');

// Get list of panthers
exports.index = function(req, res) {
  Panther.find(function (err, panthers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(panthers);
  });
};

// Get a single panther
exports.show = function(req, res) {
  Panther.findById(req.params.id, function (err, panther) {
    if(err) { return handleError(res, err); }
    if(!panther) { return res.status(404).send('Not Found'); }
    return res.json(panther);
  });
};

// Creates a new panther in the DB.
exports.create = function(req, res) {
  Panther.create(req.body, function(err, panther) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(panther);
  });
};

// Updates an existing panther in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Panther.findById(req.params.id, function (err, panther) {
//     if (err) { return handleError(res, err); }
//     if(!panther) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(panther, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(panther);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Panther.findOne({_id: req.params.id}, function (err, panther){
       if (err) {
          res.send(422,'update failed');
       } else {
          panther.replies = req.body.replies;
          panther.save();
       }
    });
};

// Deletes a panther from the DB.
exports.destroy = function(req, res) {
  Panther.findById(req.params.id, function (err, panther) {
    if(err) { return handleError(res, err); }
    if(!panther) { return res.status(404).send('Not Found'); }
    panther.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
