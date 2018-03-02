var express = require('express');
var reviewCtrl = require('../controllers/review.ctrl');

var router = express.Router();

router.post('/', reviewCtrl.save);

module.exports = router;