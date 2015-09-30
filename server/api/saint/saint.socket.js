/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Saint = require('./saint.model');

exports.register = function(socket) {
  Saint.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Saint.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('saint:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('saint:remove', doc);
}