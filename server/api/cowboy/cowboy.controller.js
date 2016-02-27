'use strict';

var _ = require('lodash');
var Cowboy = require('./cowboy.model');

// Get list of cowboys
exports.index = function(req, res) {
  Cowboy.find(function (err, cowboys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(cowboys);
  });
};

// Get a single cowboy
exports.show = function(req, res) {
  Cowboy.findById(req.params.id, function (err, cowboy) {
    if(err) { return handleError(res, err); }
    if(!cowboy) { return res.status(404).send('Not Found'); }
    return res.json(cowboy);
  });
};

// Creates a new cowboy in the DB.
exports.create = function(req, res) {
  Cowboy.create(req.body, function(err, cowboy) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(cowboy);
  });
};

// Updates an existing cowboy in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Cowboy.findById(req.params.id, function (err, cowboy) {
//     if (err) { return handleError(res, err); }
//     if(!cowboy) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(cowboy, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(cowboy);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Cowboy.findOne({_id: req.params.id}, function (err, cowboy){
       if (err) {
          res.send(422,'update failed');
       } else {
          cowboy.replies = req.body.replies;
          cowboy.save();
       }
    });
};

// Deletes a cowboy from the DB.
exports.destroy = function(req, res) {
  Cowboy.findById(req.params.id, function (err, cowboy) {
    if(err) { return handleError(res, err); }
    if(!cowboy) { return res.status(404).send('Not Found'); }
    cowboy.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
