'use strict';

var _ = require('lodash');
var Raven = require('./raven.model');

// Get list of ravens
exports.index = function(req, res) {
  Raven.find(function (err, ravens) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(ravens);
  });
};

// Get a single raven
exports.show = function(req, res) {
  Raven.findById(req.params.id, function (err, raven) {
    if(err) { return handleError(res, err); }
    if(!raven) { return res.status(404).send('Not Found'); }
    return res.json(raven);
  });
};

// Creates a new raven in the DB.
exports.create = function(req, res) {
  Raven.create(req.body, function(err, raven) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(raven);
  });
};

// Updates an existing raven in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Raven.findById(req.params.id, function (err, raven) {
    if (err) { return handleError(res, err); }
    if(!raven) { return res.status(404).send('Not Found'); }
    var updated = _.merge(raven, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(raven);
    });
  });
};

// Deletes a raven from the DB.
exports.destroy = function(req, res) {
  Raven.findById(req.params.id, function (err, raven) {
    if(err) { return handleError(res, err); }
    if(!raven) { return res.status(404).send('Not Found'); }
    raven.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}