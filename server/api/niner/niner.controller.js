'use strict';

var _ = require('lodash');
var Niner = require('./niner.model');

// Get list of niners
exports.index = function(req, res) {
  Niner.find(function (err, niners) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(niners);
  });
};

// Get a single niner
exports.show = function(req, res) {
  Niner.findById(req.params.id, function (err, niner) {
    if(err) { return handleError(res, err); }
    if(!niner) { return res.status(404).send('Not Found'); }
    return res.json(niner);
  });
};

// Creates a new niner in the DB.
exports.create = function(req, res) {
  Niner.create(req.body, function(err, niner) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(niner);
  });
};

// Updates an existing niner in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Niner.findById(req.params.id, function (err, niner) {
    if (err) { return handleError(res, err); }
    if(!niner) { return res.status(404).send('Not Found'); }
    var updated = _.merge(niner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(niner);
    });
  });
};

// Deletes a niner from the DB.
exports.destroy = function(req, res) {
  Niner.findById(req.params.id, function (err, niner) {
    if(err) { return handleError(res, err); }
    if(!niner) { return res.status(404).send('Not Found'); }
    niner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}