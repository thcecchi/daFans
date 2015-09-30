'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CowboySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Cowboy', CowboySchema);