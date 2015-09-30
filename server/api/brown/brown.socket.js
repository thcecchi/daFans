/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Brown = require('./brown.model');

exports.register = function(socket) {
  Brown.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Brown.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('brown:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('brown:remove', doc);
}