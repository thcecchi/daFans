/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Eagle = require('./eagle.model');

exports.register = function(socket) {
  Eagle.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Eagle.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('eagle:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('eagle:remove', doc);
}