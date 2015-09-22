'use strict';

var express = require('express');
var controller = require('./message.controller');

var router = express.Router();

router.param('teamId', function(req, res, next, teamId){
  bleh = dafans.collection(teamId)
  return next()
})

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
