/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Packer = require('./packer.model');

exports.register = function(socket) {
  Packer.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Packer.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('packer:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('packer:remove', doc);
}