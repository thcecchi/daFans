'use strict';

var _ = require('lodash');
var Viking = require('./viking.model');

// Get list of vikings
exports.index = function(req, res) {
  Viking.find(function (err, vikings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(vikings);
  });
};

// Get a single viking
exports.show = function(req, res) {
  Viking.findById(req.params.id, function (err, viking) {
    if(err) { return handleError(res, err); }
    if(!viking) { return res.status(404).send('Not Found'); }
    return res.json(viking);
  });
};

// Creates a new viking in the DB.
exports.create = function(req, res) {
  Viking.create(req.body, function(err, viking) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(viking);
  });
};

// Updates an existing viking in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Viking.findById(req.params.id, function (err, viking) {
    if (err) { return handleError(res, err); }
    if(!viking) { return res.status(404).send('Not Found'); }
    var updated = _.merge(viking, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(viking);
    });
  });
};

// Deletes a viking from the DB.
exports.destroy = function(req, res) {
  Viking.findById(req.params.id, function (err, viking) {
    if(err) { return handleError(res, err); }
    if(!viking) { return res.status(404).send('Not Found'); }
    viking.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}