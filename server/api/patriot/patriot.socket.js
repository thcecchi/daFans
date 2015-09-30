/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Patriot = require('./patriot.model');

exports.register = function(socket) {
  Patriot.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Patriot.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('patriot:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('patriot:remove', doc);
}