'use strict';

var _ = require('lodash');
var Dolphin = require('./dolphin.model');

// Get list of dolphins
exports.index = function(req, res) {
  Dolphin.find(function (err, dolphins) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(dolphins);
  });
};

// Get a single dolphin
exports.show = function(req, res) {
  Dolphin.findById(req.params.id, function (err, dolphin) {
    if(err) { return handleError(res, err); }
    if(!dolphin) { return res.status(404).send('Not Found'); }
    return res.json(dolphin);
  });
};

// Creates a new dolphin in the DB.
exports.create = function(req, res) {
  Dolphin.create(req.body, function(err, dolphin) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(dolphin);
  });
};

// Updates an existing dolphin in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dolphin.findById(req.params.id, function (err, dolphin) {
    if (err) { return handleError(res, err); }
    if(!dolphin) { return res.status(404).send('Not Found'); }
    var updated = _.merge(dolphin, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(dolphin);
    });
  });
};

// Deletes a dolphin from the DB.
exports.destroy = function(req, res) {
  Dolphin.findById(req.params.id, function (err, dolphin) {
    if(err) { return handleError(res, err); }
    if(!dolphin) { return res.status(404).send('Not Found'); }
    dolphin.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}