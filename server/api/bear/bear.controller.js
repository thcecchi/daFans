'use strict';

var _ = require('lodash');
var Bear = require('./bear.model');

// Get list of bears
exports.index = function(req, res) {
  Bear.find(function (err, bears) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(bears);
  });
};

// Get a single bear
exports.show = function(req, res) {
  Bear.findById(req.params.id, function (err, bear) {
    if(err) { return handleError(res, err); }
    if(!bear) { return res.status(404).send('Not Found'); }
    return res.json(bear);
  });
};

// Creates a new bear in the DB.
exports.create = function(req, res) {
  Bear.create(req.body, function(err, bear) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(bear);
  });
};

// Updates an existing bear in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bear.findById(req.params.id, function (err, bear) {
    if (err) { return handleError(res, err); }
    if(!bear) { return res.status(404).send('Not Found'); }
    var updated = _.merge(bear, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bear);
    });
  });
};

// Deletes a bear from the DB.
exports.destroy = function(req, res) {
  Bear.findById(req.params.id, function (err, bear) {
    if(err) { return handleError(res, err); }
    if(!bear) { return res.status(404).send('Not Found'); }
    bear.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}