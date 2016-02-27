'use strict';

var _ = require('lodash');
var Redskin = require('./redskin.model');

// Get list of redskins
exports.index = function(req, res) {
  Redskin.find(function (err, redskins) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(redskins);
  });
};

// Get a single redskin
exports.show = function(req, res) {
  Redskin.findById(req.params.id, function (err, redskin) {
    if(err) { return handleError(res, err); }
    if(!redskin) { return res.status(404).send('Not Found'); }
    return res.json(redskin);
  });
};

// Creates a new redskin in the DB.
exports.create = function(req, res) {
  Redskin.create(req.body, function(err, redskin) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(redskin);
  });
};

// Updates an existing redskin in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Redskin.findById(req.params.id, function (err, redskin) {
//     if (err) { return handleError(res, err); }
//     if(!redskin) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(redskin, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(redskin);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Redskin.findOne({_id: req.params.id}, function (err, redskin){
       if (err) {
          res.send(422,'update failed');
       } else {
          redskin.replies = req.body.replies;
          redskin.save();
       }
    });
};

// Deletes a redskin from the DB.
exports.destroy = function(req, res) {
  Redskin.findById(req.params.id, function (err, redskin) {
    if(err) { return handleError(res, err); }
    if(!redskin) { return res.status(404).send('Not Found'); }
    redskin.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
