/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Cowboy = require('./cowboy.model');

exports.register = function(socket) {
  Cowboy.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Cowboy.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('cowboy:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cowboy:remove', doc);
}