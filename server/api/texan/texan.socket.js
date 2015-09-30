/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Texan = require('./texan.model');

exports.register = function(socket) {
  Texan.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Texan.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('texan:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('texan:remove', doc);
}