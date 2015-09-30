/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Ram = require('./ram.model');

exports.register = function(socket) {
  Ram.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Ram.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ram:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ram:remove', doc);
}