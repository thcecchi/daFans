'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VikingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Viking', VikingSchema);