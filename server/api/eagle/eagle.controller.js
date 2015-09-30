'use strict';

var _ = require('lodash');
var Eagle = require('./eagle.model');

// Get list of eagles
exports.index = function(req, res) {
  Eagle.find(function (err, eagles) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(eagles);
  });
};

// Get a single eagle
exports.show = function(req, res) {
  Eagle.findById(req.params.id, function (err, eagle) {
    if(err) { return handleError(res, err); }
    if(!eagle) { return res.status(404).send('Not Found'); }
    return res.json(eagle);
  });
};

// Creates a new eagle in the DB.
exports.create = function(req, res) {
  Eagle.create(req.body, function(err, eagle) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(eagle);
  });
};

// Updates an existing eagle in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Eagle.findById(req.params.id, function (err, eagle) {
    if (err) { return handleError(res, err); }
    if(!eagle) { return res.status(404).send('Not Found'); }
    var updated = _.merge(eagle, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(eagle);
    });
  });
};

// Deletes a eagle from the DB.
exports.destroy = function(req, res) {
  Eagle.findById(req.params.id, function (err, eagle) {
    if(err) { return handleError(res, err); }
    if(!eagle) { return res.status(404).send('Not Found'); }
    eagle.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}