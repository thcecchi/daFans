/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Panther = require('./panther.model');

exports.register = function(socket) {
  Panther.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Panther.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('panther:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('panther:remove', doc);
}