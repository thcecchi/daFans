/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Redskin = require('./redskin.model');

exports.register = function(socket) {
  Redskin.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Redskin.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('redskin:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('redskin:remove', doc);
}