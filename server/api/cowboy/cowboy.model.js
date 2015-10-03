'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CowboySchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Cowboy', CowboySchema);
