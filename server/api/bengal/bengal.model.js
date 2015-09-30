'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BengalSchema = new Schema({
  message: String,
  lat: Number,
  lng: Number,
  user: String
});

module.exports = mongoose.model('Bengal', BengalSchema);
