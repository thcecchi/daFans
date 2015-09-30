/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Bengal = require('./bengal.model');

exports.register = function(socket) {
  Bengal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Bengal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('bengal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('bengal:remove', doc);
}