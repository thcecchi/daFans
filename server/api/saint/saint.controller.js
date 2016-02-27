'use strict';

var _ = require('lodash');
var Saint = require('./saint.model');

// Get list of saints
exports.index = function(req, res) {
  Saint.find(function (err, saints) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(saints);
  });
};

// Get a single saint
exports.show = function(req, res) {
  Saint.findById(req.params.id, function (err, saint) {
    if(err) { return handleError(res, err); }
    if(!saint) { return res.status(404).send('Not Found'); }
    return res.json(saint);
  });
};

// Creates a new saint in the DB.
exports.create = function(req, res) {
  Saint.create(req.body, function(err, saint) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(saint);
  });
};

// Updates an existing saint in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Saint.findById(req.params.id, function (err, saint) {
//     if (err) { return handleError(res, err); }
//     if(!saint) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(saint, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(saint);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Saint.findOne({_id: req.params.id}, function (err, saint){
       if (err) {
          res.send(422,'update failed');
       } else {
          saint.replies = req.body.replies;
          saint.save();
       }
    });
};

// Deletes a saint from the DB.
exports.destroy = function(req, res) {
  Saint.findById(req.params.id, function (err, saint) {
    if(err) { return handleError(res, err); }
    if(!saint) { return res.status(404).send('Not Found'); }
    saint.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
