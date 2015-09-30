/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Falcon = require('./falcon.model');

exports.register = function(socket) {
  Falcon.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Falcon.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('falcon:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('falcon:remove', doc);
}