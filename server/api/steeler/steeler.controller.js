'use strict';

var _ = require('lodash');
var Steeler = require('./steeler.model');

// Get list of steelers
exports.index = function(req, res) {
  Steeler.find(function (err, steelers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(steelers);
  });
};

// Get a single steeler
exports.show = function(req, res) {
  Steeler.findById(req.params.id, function (err, steeler) {
    if(err) { return handleError(res, err); }
    if(!steeler) { return res.status(404).send('Not Found'); }
    return res.json(steeler);
  });
};

// Creates a new steeler in the DB.
exports.create = function(req, res) {
  Steeler.create(req.body, function(err, steeler) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(steeler);
  });
};

// Updates an existing steeler in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Steeler.findById(req.params.id, function (err, steeler) {
    if (err) { return handleError(res, err); }
    if(!steeler) { return res.status(404).send('Not Found'); }
    var updated = _.merge(steeler, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(steeler);
    });
  });
};

// Deletes a steeler from the DB.
exports.destroy = function(req, res) {
  Steeler.findById(req.params.id, function (err, steeler) {
    if(err) { return handleError(res, err); }
    if(!steeler) { return res.status(404).send('Not Found'); }
    steeler.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}