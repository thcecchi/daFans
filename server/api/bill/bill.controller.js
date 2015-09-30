'use strict';

var _ = require('lodash');
var Bill = require('./bill.model');

// Get list of bills
exports.index = function(req, res) {
  Bill.find(function (err, bills) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(bills);
  });
};

// Get a single bill
exports.show = function(req, res) {
  Bill.findById(req.params.id, function (err, bill) {
    if(err) { return handleError(res, err); }
    if(!bill) { return res.status(404).send('Not Found'); }
    return res.json(bill);
  });
};

// Creates a new bill in the DB.
exports.create = function(req, res) {
  Bill.create(req.body, function(err, bill) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(bill);
  });
};

// Updates an existing bill in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bill.findById(req.params.id, function (err, bill) {
    if (err) { return handleError(res, err); }
    if(!bill) { return res.status(404).send('Not Found'); }
    var updated = _.merge(bill, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bill);
    });
  });
};

// Deletes a bill from the DB.
exports.destroy = function(req, res) {
  Bill.findById(req.params.id, function (err, bill) {
    if(err) { return handleError(res, err); }
    if(!bill) { return res.status(404).send('Not Found'); }
    bill.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}