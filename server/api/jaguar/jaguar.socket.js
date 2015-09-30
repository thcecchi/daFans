/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Jaguar = require('./jaguar.model');

exports.register = function(socket) {
  Jaguar.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Jaguar.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('jaguar:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('jaguar:remove', doc);
}