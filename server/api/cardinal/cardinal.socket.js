/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Cardinal = require('./cardinal.model');

exports.register = function(socket) {
  Cardinal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Cardinal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('cardinal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cardinal:remove', doc);
}