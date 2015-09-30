/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Jet = require('./jet.model');

exports.register = function(socket) {
  Jet.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Jet.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('jet:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('jet:remove', doc);
}