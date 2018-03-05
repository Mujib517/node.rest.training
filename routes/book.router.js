var express = require('express');
var router = express.Router();
var bookCtrl = require('../controllers/book.ctrl');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, done) {
        done(null, "uploads/");
    },
    filename: function (req, file, done) {
        var dt = Date.now();
        var filename = dt + '-' + file.originalname;
        req.body.img = filename;
        done(null, filename);
    }
});
var upload = multer({ storage: storage });


//get
router.get('/:pageIndex/:pageSize', bookCtrl.get);
router.get('/', bookCtrl.get);

router.post('/', upload.single('img'), bookCtrl.save);
// DELETE api/books/adfkjakdfj
router.get('/:id', bookCtrl.getById);
router.delete('/:id', bookCtrl.delete);
router.put('/:id', bookCtrl.update);


//GET -READ
//Post - Create
//PUT -update
//Delete =Delete

module.exports = router;