'use strict';

var _ = require('lodash');
var Titan = require('./titan.model');

// Get list of titans
exports.index = function(req, res) {
  Titan.find(function (err, titans) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(titans);
  });
};

// Get a single titan
exports.show = function(req, res) {
  Titan.findById(req.params.id, function (err, titan) {
    if(err) { return handleError(res, err); }
    if(!titan) { return res.status(404).send('Not Found'); }
    return res.json(titan);
  });
};

// Creates a new titan in the DB.
exports.create = function(req, res) {
  Titan.create(req.body, function(err, titan) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(titan);
  });
};

// Updates an existing titan in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Titan.findById(req.params.id, function (err, titan) {
    if (err) { return handleError(res, err); }
    if(!titan) { return res.status(404).send('Not Found'); }
    var updated = _.merge(titan, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(titan);
    });
  });
};

// Deletes a titan from the DB.
exports.destroy = function(req, res) {
  Titan.findById(req.params.id, function (err, titan) {
    if(err) { return handleError(res, err); }
    if(!titan) { return res.status(404).send('Not Found'); }
    titan.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}