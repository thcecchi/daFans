'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChargerSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Charger', ChargerSchema);