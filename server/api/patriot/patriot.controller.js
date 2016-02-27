'use strict';

var _ = require('lodash');
var Patriot = require('./patriot.model');

// Get list of patriots
exports.index = function(req, res) {
  Patriot.find(function (err, patriots) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(patriots);
  });
};

// Get a single patriot
exports.show = function(req, res) {
  Patriot.findById(req.params.id, function (err, patriot) {
    if(err) { return handleError(res, err); }
    if(!patriot) { return res.status(404).send('Not Found'); }
    return res.json(patriot);
  });
};

// Creates a new patriot in the DB.
exports.create = function(req, res) {
  Patriot.create(req.body, function(err, patriot) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(patriot);
  });
};

// Updates an existing patriot in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Patriot.findById(req.params.id, function (err, patriot) {
//     if (err) { return handleError(res, err); }
//     if(!patriot) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(patriot, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(patriot);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Patriot.findOne({_id: req.params.id}, function (err, patriot){
       if (err) {
          res.send(422,'update failed');
       } else {
          patriot.replies = req.body.replies;
          patriot.save();
       }
    });
};

// Deletes a patriot from the DB.
exports.destroy = function(req, res) {
  Patriot.findById(req.params.id, function (err, patriot) {
    if(err) { return handleError(res, err); }
    if(!patriot) { return res.status(404).send('Not Found'); }
    patriot.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
