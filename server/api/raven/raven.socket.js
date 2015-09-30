/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Raven = require('./raven.model');

exports.register = function(socket) {
  Raven.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Raven.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('raven:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('raven:remove', doc);
}