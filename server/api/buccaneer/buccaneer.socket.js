/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Buccaneer = require('./buccaneer.model');

exports.register = function(socket) {
  Buccaneer.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Buccaneer.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('buccaneer:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('buccaneer:remove', doc);
}