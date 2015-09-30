'use strict';

var _ = require('lodash');
var Cardinal = require('./cardinal.model');

// Get list of cardinals
exports.index = function(req, res) {
  Cardinal.find(function (err, cardinals) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(cardinals);
  });
};

// Get a single cardinal
exports.show = function(req, res) {
  Cardinal.findById(req.params.id, function (err, cardinal) {
    if(err) { return handleError(res, err); }
    if(!cardinal) { return res.status(404).send('Not Found'); }
    return res.json(cardinal);
  });
};

// Creates a new cardinal in the DB.
exports.create = function(req, res) {
  Cardinal.create(req.body, function(err, cardinal) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(cardinal);
  });
};

// Updates an existing cardinal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cardinal.findById(req.params.id, function (err, cardinal) {
    if (err) { return handleError(res, err); }
    if(!cardinal) { return res.status(404).send('Not Found'); }
    var updated = _.merge(cardinal, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(cardinal);
    });
  });
};

// Deletes a cardinal from the DB.
exports.destroy = function(req, res) {
  Cardinal.findById(req.params.id, function (err, cardinal) {
    if(err) { return handleError(res, err); }
    if(!cardinal) { return res.status(404).send('Not Found'); }
    cardinal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}