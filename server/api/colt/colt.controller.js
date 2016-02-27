'use strict';

var _ = require('lodash');
var Colt = require('./colt.model');

// Get list of colts
exports.index = function(req, res) {
  Colt.find(function (err, colts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(colts);
  });
};

// Get a single colt
exports.show = function(req, res) {
  Colt.findById(req.params.id, function (err, colt) {
    if(err) { return handleError(res, err); }
    if(!colt) { return res.status(404).send('Not Found'); }
    return res.json(colt);
  });
};

// Creates a new colt in the DB.
exports.create = function(req, res) {
  Colt.create(req.body, function(err, colt) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(colt);
  });
};

// Updates an existing colt in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Colt.findById(req.params.id, function (err, colt) {
//     if (err) { return handleError(res, err); }
//     if(!colt) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(colt, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(colt);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Colt.findOne({_id: req.params.id}, function (err, colt){
       if (err) {
          res.send(422,'update failed');
       } else {
          colt.replies = req.body.replies;
          colt.save();
       }
    });
};

// Deletes a colt from the DB.
exports.destroy = function(req, res) {
  Colt.findById(req.params.id, function (err, colt) {
    if(err) { return handleError(res, err); }
    if(!colt) { return res.status(404).send('Not Found'); }
    colt.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
