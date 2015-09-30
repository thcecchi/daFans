'use strict';

var _ = require('lodash');
var Charger = require('./charger.model');

// Get list of chargers
exports.index = function(req, res) {
  Charger.find(function (err, chargers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(chargers);
  });
};

// Get a single charger
exports.show = function(req, res) {
  Charger.findById(req.params.id, function (err, charger) {
    if(err) { return handleError(res, err); }
    if(!charger) { return res.status(404).send('Not Found'); }
    return res.json(charger);
  });
};

// Creates a new charger in the DB.
exports.create = function(req, res) {
  Charger.create(req.body, function(err, charger) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(charger);
  });
};

// Updates an existing charger in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Charger.findById(req.params.id, function (err, charger) {
    if (err) { return handleError(res, err); }
    if(!charger) { return res.status(404).send('Not Found'); }
    var updated = _.merge(charger, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(charger);
    });
  });
};

// Deletes a charger from the DB.
exports.destroy = function(req, res) {
  Charger.findById(req.params.id, function (err, charger) {
    if(err) { return handleError(res, err); }
    if(!charger) { return res.status(404).send('Not Found'); }
    charger.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}