'use strict';

var _ = require('lodash');
var Buccaneer = require('./buccaneer.model');

// Get list of buccaneers
exports.index = function(req, res) {
  Buccaneer.find(function (err, buccaneers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(buccaneers);
  });
};

// Get a single buccaneer
exports.show = function(req, res) {
  Buccaneer.findById(req.params.id, function (err, buccaneer) {
    if(err) { return handleError(res, err); }
    if(!buccaneer) { return res.status(404).send('Not Found'); }
    return res.json(buccaneer);
  });
};

// Creates a new buccaneer in the DB.
exports.create = function(req, res) {
  Buccaneer.create(req.body, function(err, buccaneer) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(buccaneer);
  });
};

// Updates an existing buccaneer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Buccaneer.findById(req.params.id, function (err, buccaneer) {
    if (err) { return handleError(res, err); }
    if(!buccaneer) { return res.status(404).send('Not Found'); }
    var updated = _.merge(buccaneer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(buccaneer);
    });
  });
};

// Deletes a buccaneer from the DB.
exports.destroy = function(req, res) {
  Buccaneer.findById(req.params.id, function (err, buccaneer) {
    if(err) { return handleError(res, err); }
    if(!buccaneer) { return res.status(404).send('Not Found'); }
    buccaneer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}