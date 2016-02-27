'use strict';

var _ = require('lodash');
var Ram = require('./ram.model');

// Get list of rams
exports.index = function(req, res) {
  Ram.find(function (err, rams) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(rams);
  });
};

// Get a single ram
exports.show = function(req, res) {
  Ram.findById(req.params.id, function (err, ram) {
    if(err) { return handleError(res, err); }
    if(!ram) { return res.status(404).send('Not Found'); }
    return res.json(ram);
  });
};

// Creates a new ram in the DB.
exports.create = function(req, res) {
  Ram.create(req.body, function(err, ram) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(ram);
  });
};

// Updates an existing ram in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Ram.findById(req.params.id, function (err, ram) {
//     if (err) { return handleError(res, err); }
//     if(!ram) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(ram, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(ram);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Ram.findOne({_id: req.params.id}, function (err, ram){
       if (err) {
          res.send(422,'update failed');
       } else {
          ram.replies = req.body.replies;
          ram.save();
       }
    });
};

// Deletes a ram from the DB.
exports.destroy = function(req, res) {
  Ram.findById(req.params.id, function (err, ram) {
    if(err) { return handleError(res, err); }
    if(!ram) { return res.status(404).send('Not Found'); }
    ram.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
