'use strict';

var _ = require('lodash');
var Texan = require('./texan.model');

// Get list of texans
exports.index = function(req, res) {
  Texan.find(function (err, texans) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(texans);
  });
};

// Get a single texan
exports.show = function(req, res) {
  Texan.findById(req.params.id, function (err, texan) {
    if(err) { return handleError(res, err); }
    if(!texan) { return res.status(404).send('Not Found'); }
    return res.json(texan);
  });
};

// Creates a new texan in the DB.
exports.create = function(req, res) {
  Texan.create(req.body, function(err, texan) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(texan);
  });
};

// Updates an existing texan in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Texan.findById(req.params.id, function (err, texan) {
//     if (err) { return handleError(res, err); }
//     if(!texan) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(texan, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(texan);
//     });
//   });
// };

// THIS WILL UPDATE JUST THE REPLIES PROPERTY
exports.update = function(req, res) {
  Texan.findOne({_id: req.params.id}, function (err, texan){
       if (err) {
          res.send(422,'update failed');
       } else {
          texan.replies = req.body.replies;
          texan.save();
       }
    });
};

// Deletes a texan from the DB.
exports.destroy = function(req, res) {
  Texan.findById(req.params.id, function (err, texan) {
    if(err) { return handleError(res, err); }
    if(!texan) { return res.status(404).send('Not Found'); }
    texan.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
