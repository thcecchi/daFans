'use strict';
var whatTeam = require("../../routes.js");
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  message: String,
  lat: Number,
  lng: Number,
  user: String
});

var express = require('express');

var router = express.Router();

function toTitleCase(str) {
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

  module.exports = mongoose.model("Bengals", MessageSchema);
