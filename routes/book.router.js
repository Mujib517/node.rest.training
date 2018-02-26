var express = require('express');
var router = express.Router();
var bookCtrl = require('../controllers/book.ctrl');

router.get('/', bookCtrl.get);
router.get('/:id', bookCtrl.getById);
router.post('/', bookCtrl.save);

module.exports = router;