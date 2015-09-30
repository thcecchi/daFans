'use strict';

var _ = require('lodash');
var Seahawk = require('./seahawk.model');

// Get list of seahawks
exports.index = function(req, res) {
  Seahawk.find(function (err, seahawks) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(seahawks);
  });
};

// Get a single seahawk
exports.show = function(req, res) {
  Seahawk.findById(req.params.id, function (err, seahawk) {
    if(err) { return handleError(res, err); }
    if(!seahawk) { return res.status(404).send('Not Found'); }
    return res.json(seahawk);
  });
};

// Creates a new seahawk in the DB.
exports.create = function(req, res) {
  Seahawk.create(req.body, function(err, seahawk) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(seahawk);
  });
};

// Updates an existing seahawk in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Seahawk.findById(req.params.id, function (err, seahawk) {
    if (err) { return handleError(res, err); }
    if(!seahawk) { return res.status(404).send('Not Found'); }
    var updated = _.merge(seahawk, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(seahawk);
    });
  });
};

// Deletes a seahawk from the DB.
exports.destroy = function(req, res) {
  Seahawk.findById(req.params.id, function (err, seahawk) {
    if(err) { return handleError(res, err); }
    if(!seahawk) { return res.status(404).send('Not Found'); }
    seahawk.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}