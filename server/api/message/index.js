'use strict';

var express = require('express');
var controller = require('./message.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:teamId', controller.show);
router.post('/', controller.create);
router.put('/:teamId', controller.update);
router.patch('/:teamId', controller.update);
router.delete('/:teamId', controller.destroy);

module.exports = router;
