/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Raider = require('./raider.model');

exports.register = function(socket) {
  Raider.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Raider.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('raider:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('raider:remove', doc);
}