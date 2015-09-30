'use strict';

var _ = require('lodash');
var Falcon = require('./falcon.model');

// Get list of falcons
exports.index = function(req, res) {
  Falcon.find(function (err, falcons) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(falcons);
  });
};

// Get a single falcon
exports.show = function(req, res) {
  Falcon.findById(req.params.id, function (err, falcon) {
    if(err) { return handleError(res, err); }
    if(!falcon) { return res.status(404).send('Not Found'); }
    return res.json(falcon);
  });
};

// Creates a new falcon in the DB.
exports.create = function(req, res) {
  Falcon.create(req.body, function(err, falcon) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(falcon);
  });
};

// Updates an existing falcon in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Falcon.findById(req.params.id, function (err, falcon) {
    if (err) { return handleError(res, err); }
    if(!falcon) { return res.status(404).send('Not Found'); }
    var updated = _.merge(falcon, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(falcon);
    });
  });
};

// Deletes a falcon from the DB.
exports.destroy = function(req, res) {
  Falcon.findById(req.params.id, function (err, falcon) {
    if(err) { return handleError(res, err); }
    if(!falcon) { return res.status(404).send('Not Found'); }
    falcon.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}