/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Colt = require('./colt.model');

exports.register = function(socket) {
  Colt.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Colt.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('colt:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('colt:remove', doc);
}