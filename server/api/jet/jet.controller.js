'use strict';

var _ = require('lodash');
var Jet = require('./jet.model');

// Get list of jets
exports.index = function(req, res) {
  Jet.find(function (err, jets) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(jets);
  });
};

// Get a single jet
exports.show = function(req, res) {
  Jet.findById(req.params.id, function (err, jet) {
    if(err) { return handleError(res, err); }
    if(!jet) { return res.status(404).send('Not Found'); }
    return res.json(jet);
  });
};

// Creates a new jet in the DB.
exports.create = function(req, res) {
  Jet.create(req.body, function(err, jet) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(jet);
  });
};

// Updates an existing jet in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Jet.findById(req.params.id, function (err, jet) {
    if (err) { return handleError(res, err); }
    if(!jet) { return res.status(404).send('Not Found'); }
    var updated = _.merge(jet, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(jet);
    });
  });
};

// Deletes a jet from the DB.
exports.destroy = function(req, res) {
  Jet.findById(req.params.id, function (err, jet) {
    if(err) { return handleError(res, err); }
    if(!jet) { return res.status(404).send('Not Found'); }
    jet.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}