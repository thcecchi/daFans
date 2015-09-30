/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Giant = require('./giant.model');

exports.register = function(socket) {
  Giant.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Giant.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('giant:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('giant:remove', doc);
}