'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PackerSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Packer', PackerSchema);