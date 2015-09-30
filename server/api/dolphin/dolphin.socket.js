/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Dolphin = require('./dolphin.model');

exports.register = function(socket) {
  Dolphin.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Dolphin.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dolphin:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dolphin:remove', doc);
}