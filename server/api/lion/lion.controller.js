'use strict';

var _ = require('lodash');
var Lion = require('./lion.model');

// Get list of lions
exports.index = function(req, res) {
  Lion.find(function (err, lions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(lions);
  });
};

// Get a single lion
exports.show = function(req, res) {
  Lion.findById(req.params.id, function (err, lion) {
    if(err) { return handleError(res, err); }
    if(!lion) { return res.status(404).send('Not Found'); }
    return res.json(lion);
  });
};

// Creates a new lion in the DB.
exports.create = function(req, res) {
  Lion.create(req.body, function(err, lion) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(lion);
  });
};

// Updates an existing lion in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Lion.findById(req.params.id, function (err, lion) {
//     if (err) { return handleError(res, err); }
//     if(!lion) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(lion, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(lion);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Lion.findOne({_id: req.params.id}, function (err, lion){
       if (err) {
          res.send(422,'update failed');
       } else {
          lion.replies = req.body.replies;
          lion.save();
       }
    });
};

// Deletes a lion from the DB.
exports.destroy = function(req, res) {
  Lion.findById(req.params.id, function (err, lion) {
    if(err) { return handleError(res, err); }
    if(!lion) { return res.status(404).send('Not Found'); }
    lion.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
