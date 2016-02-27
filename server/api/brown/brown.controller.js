'use strict';

var _ = require('lodash');
var Brown = require('./brown.model');

// Get list of browns
exports.index = function(req, res) {
  Brown.find(function (err, browns) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(browns);
  });
};

// Get a single brown
exports.show = function(req, res) {
  Brown.findById(req.params.id, function (err, brown) {
    if(err) { return handleError(res, err); }
    if(!brown) { return res.status(404).send('Not Found'); }
    return res.json(brown);
  });
};

// Creates a new brown in the DB.
exports.create = function(req, res) {
  Brown.create(req.body, function(err, brown) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(brown);
  });
};

// Updates an existing brown in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Brown.findById(req.params.id, function (err, brown) {
//     if (err) { return handleError(res, err); }
//     if(!brown) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(brown, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(brown);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Brown.findOne({_id: req.params.id}, function (err, brown){
       if (err) {
          res.send(422,'update failed');
       } else {
          brown.replies = req.body.replies;
          brown.save();
       }
    });
};

// Deletes a brown from the DB.
exports.destroy = function(req, res) {
  Brown.findById(req.params.id, function (err, brown) {
    if(err) { return handleError(res, err); }
    if(!brown) { return res.status(404).send('Not Found'); }
    brown.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
