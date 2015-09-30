/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Charger = require('./charger.model');

exports.register = function(socket) {
  Charger.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Charger.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('charger:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('charger:remove', doc);
}