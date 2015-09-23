'use strict';

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

function toTitleCase(str)
{
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

router.param('id', function(req, res, next, teamId){
  req.collection = dafans.collection(id)
  return next()
})


  module.exports = mongoose.model("Bengals", MessageSchema);
