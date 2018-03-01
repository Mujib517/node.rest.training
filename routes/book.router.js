var express = require('express');
var router = express.Router();
var bookCtrl = require('../controllers/book.ctrl');

//get
router.get('/:pageIndex/:pageSize', bookCtrl.get);
router.get('/', bookCtrl.get);

router.post('/', bookCtrl.save);
// DELETE api/books/adfkjakdfj
router.get('/:id', bookCtrl.getById);
router.delete('/:id', bookCtrl.delete);
router.put('/:id', bookCtrl.update);


//GET -READ
//Post - Create
//PUT -update
//Delete =Delete

module.exports = router;