'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var Reply = new Schema({
      reply  : String,
      replyTime  : String
    }, { strict: false });

    var FalconSchema = new Schema({
      message: String,
      loc: String,
      user: String,
      time: String,
      replies: [Reply]
    }, { strict: false });

module.exports = mongoose.model('Falcon', FalconSchema);
