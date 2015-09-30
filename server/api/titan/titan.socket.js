/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Titan = require('./titan.model');

exports.register = function(socket) {
  Titan.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Titan.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('titan:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('titan:remove', doc);
}