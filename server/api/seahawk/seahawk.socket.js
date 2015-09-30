/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Seahawk = require('./seahawk.model');

exports.register = function(socket) {
  Seahawk.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Seahawk.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('seahawk:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('seahawk:remove', doc);
}