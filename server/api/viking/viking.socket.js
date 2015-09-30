/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Viking = require('./viking.model');

exports.register = function(socket) {
  Viking.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Viking.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('viking:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('viking:remove', doc);
}