'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var express = require('express');
var router = express.Router();
var app = express();

var MessageSchema = new Schema({
  message: String,
  lat: Number,
  lng: Number,
  user: String
});

  module.exports = mongoose.model("Message", MessageSchema);
