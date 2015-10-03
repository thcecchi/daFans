'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChiefSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Chief', ChiefSchema);
