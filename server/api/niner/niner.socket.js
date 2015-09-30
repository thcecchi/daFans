/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Niner = require('./niner.model');

exports.register = function(socket) {
  Niner.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Niner.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('niner:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('niner:remove', doc);
}