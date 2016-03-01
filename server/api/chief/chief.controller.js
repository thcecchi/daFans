'use strict';

var _ = require('lodash');
var Chief = require('./chief.model');

// Get list of chiefs
exports.index = function(req, res) {
  Chief.find(function (err, chiefs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(chiefs);
  });
};

// Get a single chief
exports.show = function(req, res) {
  Chief.findById(req.params.id, function (err, chief) {
    if(err) { return handleError(res, err); }
    if(!chief) { return res.status(404).send('Not Found'); }
    return res.json(chief);
  });
};

// Creates a new chief in the DB.
exports.create = function(req, res) {
  Chief.create(req.body, function(err, chief) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(chief);
  });
};

// Updates an existing chief in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Chief.findById(req.params.id, function (err, chief) {
//     if (err) { return handleError(res, err); }
//     if(!chief) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(chief, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(chief);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Chief.findOne({_id: req.params.id}, function (err, chief){
       if (err) {
          res.send(422,'update failed');
       } else {
          chief.replies = req.body.replies;
          chief.save();
       }
    });
};

// Deletes a chief from the DB.
exports.destroy = function(req, res) {
  Chief.findById(req.params.id, function (err, chief) {
    if(err) { return handleError(res, err); }
    if(!chief) { return res.status(404).send('Not Found'); }
    chief.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
