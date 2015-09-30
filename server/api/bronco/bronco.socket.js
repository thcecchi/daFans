/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Bronco = require('./bronco.model');

exports.register = function(socket) {
  Bronco.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Bronco.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('bronco:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('bronco:remove', doc);
}