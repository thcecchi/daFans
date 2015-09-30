/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Bear = require('./bear.model');

exports.register = function(socket) {
  Bear.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Bear.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('bear:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('bear:remove', doc);
}