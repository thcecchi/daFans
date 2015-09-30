'use strict';

var _ = require('lodash');
var Bengal = require('./bengal.model');

// Get list of bengals
exports.index = function(req, res) {
  Bengal.find(function (err, bengals) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(bengals);
  });
};

// Get a single bengal
exports.show = function(req, res) {
  Bengal.findById(req.params.id, function (err, bengal) {
    if(err) { return handleError(res, err); }
    if(!bengal) { return res.status(404).send('Not Found'); }
    return res.json(bengal);
  });
};

// Creates a new bengal in the DB.
exports.create = function(req, res) {
  Bengal.create(req.body, function(err, bengal) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(bengal);
  });
};

// Updates an existing bengal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bengal.findById(req.params.id, function (err, bengal) {
    if (err) { return handleError(res, err); }
    if(!bengal) { return res.status(404).send('Not Found'); }
    var updated = _.merge(bengal, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bengal);
    });
  });
};

// Deletes a bengal from the DB.
exports.destroy = function(req, res) {
  Bengal.findById(req.params.id, function (err, bengal) {
    if(err) { return handleError(res, err); }
    if(!bengal) { return res.status(404).send('Not Found'); }
    bengal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}