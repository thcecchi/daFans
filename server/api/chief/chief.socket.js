/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Chief = require('./chief.model');

exports.register = function(socket) {
  Chief.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Chief.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('chief:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('chief:remove', doc);
}