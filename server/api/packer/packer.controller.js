'use strict';

var _ = require('lodash');
var Packer = require('./packer.model');

// Get list of packers
exports.index = function(req, res) {
  Packer.find(function (err, packers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(packers);
  });
};

// Get a single packer
exports.show = function(req, res) {
  Packer.findById(req.params.id, function (err, packer) {
    if(err) { return handleError(res, err); }
    if(!packer) { return res.status(404).send('Not Found'); }
    return res.json(packer);
  });
};

// Creates a new packer in the DB.
exports.create = function(req, res) {
  Packer.create(req.body, function(err, packer) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(packer);
  });
};

// Updates an existing packer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Packer.findById(req.params.id, function (err, packer) {
    if (err) { return handleError(res, err); }
    if(!packer) { return res.status(404).send('Not Found'); }
    var updated = _.merge(packer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(packer);
    });
  });
};

// Deletes a packer from the DB.
exports.destroy = function(req, res) {
  Packer.findById(req.params.id, function (err, packer) {
    if(err) { return handleError(res, err); }
    if(!packer) { return res.status(404).send('Not Found'); }
    packer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}