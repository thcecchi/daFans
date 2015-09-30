'use strict';

var _ = require('lodash');
var Giant = require('./giant.model');

// Get list of giants
exports.index = function(req, res) {
  Giant.find(function (err, giants) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(giants);
  });
};

// Get a single giant
exports.show = function(req, res) {
  Giant.findById(req.params.id, function (err, giant) {
    if(err) { return handleError(res, err); }
    if(!giant) { return res.status(404).send('Not Found'); }
    return res.json(giant);
  });
};

// Creates a new giant in the DB.
exports.create = function(req, res) {
  Giant.create(req.body, function(err, giant) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(giant);
  });
};

// Updates an existing giant in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Giant.findById(req.params.id, function (err, giant) {
    if (err) { return handleError(res, err); }
    if(!giant) { return res.status(404).send('Not Found'); }
    var updated = _.merge(giant, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(giant);
    });
  });
};

// Deletes a giant from the DB.
exports.destroy = function(req, res) {
  Giant.findById(req.params.id, function (err, giant) {
    if(err) { return handleError(res, err); }
    if(!giant) { return res.status(404).send('Not Found'); }
    giant.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}