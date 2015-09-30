/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Bill = require('./bill.model');

exports.register = function(socket) {
  Bill.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Bill.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('bill:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('bill:remove', doc);
}