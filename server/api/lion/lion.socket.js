/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lion = require('./lion.model');

exports.register = function(socket) {
  Lion.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lion.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lion:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lion:remove', doc);
}