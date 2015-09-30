'use strict';

var _ = require('lodash');
var Bronco = require('./bronco.model');

// Get list of broncos
exports.index = function(req, res) {
  Bronco.find(function (err, broncos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(broncos);
  });
};

// Get a single bronco
exports.show = function(req, res) {
  Bronco.findById(req.params.id, function (err, bronco) {
    if(err) { return handleError(res, err); }
    if(!bronco) { return res.status(404).send('Not Found'); }
    return res.json(bronco);
  });
};

// Creates a new bronco in the DB.
exports.create = function(req, res) {
  Bronco.create(req.body, function(err, bronco) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(bronco);
  });
};

// Updates an existing bronco in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bronco.findById(req.params.id, function (err, bronco) {
    if (err) { return handleError(res, err); }
    if(!bronco) { return res.status(404).send('Not Found'); }
    var updated = _.merge(bronco, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bronco);
    });
  });
};

// Deletes a bronco from the DB.
exports.destroy = function(req, res) {
  Bronco.findById(req.params.id, function (err, bronco) {
    if(err) { return handleError(res, err); }
    if(!bronco) { return res.status(404).send('Not Found'); }
    bronco.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}