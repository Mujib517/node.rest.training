
var Book = require('../models/book.model');

function BookCtrl() {
    this.get = function (req, res) {
        var count = 0;

        // var pageSize = req.params.pageSize ? +req.params.pageSize : 10;
        // var pageIndex = req.params.pageIndex ? +req.params.pageIndex : 0;

        var pageSize = +req.params.pageSize || 10;
        var pageIndex = +req.params.pageIndex || 0;


        Book.count(function (err, cnt) {
            count = cnt;
            //deferred execution
            var query = Book.find();
            query.sort("-lastUpdated");
            query.skip(pageIndex * pageSize);
            query.limit(pageSize);

            query.exec(function (err, books) {
                //truthy: 1,{},"kajdfkj"
                //falsy: 0,"",false,undefined,null,NaN
                console.log(err);
                if (err) {
                    res.status(500);
                    res.send("Internal Server Error");//
                }
                else {
                    var response = {
                        metadata: {
                            count: count,
                            pages: Math.ceil(count / pageSize)
                        },
                        data: books
                    };
                    res.status(200);
                    res.json(response);
                }
            });
        });
    }

    this.getById = function (req, res) {
        var id = req.params.id;
        Book.findById(id, { '__v': 0 }).exec()
            .then(function (book) {
                if (!book) {
                    res.status(404);
                    res.send("Not found");
                }
                else {
                    res.status(200);
                    res.json(book);
                }
            })
            .catch(function (err) {
                res.status(500);
                res.send("Internal Server Error");
            });
    }

    this.save = function (req, res) {

        var book = new Book(req.body);
        book.save(function (err, savedBook) {
            if (!err) {
                res.status(201);//created
                res.send(savedBook);
            }
            else {
                res.status(500);
                res.send("Internal Server Error");
            }

        });

    }

    this.delete = function (req, res) {
        var id = req.params.id;
        Book.findByIdAndRemove(id, function (err) {
            if (!err) {
                res.status(204); //No content
                res.send();
            }
            else {
                res.status(500);
                res.send("Internal Server Error");
            }
        });
    }

    this.update = function (req, res) {
        var id = req.params.id;

        Book.findByIdAndUpdate(id, {
            $set:
                {
                    price: req.body.price,
                    name: req.body.name,
                    inStock: req.body.inStock,
                    author: req.body.author
                }
        }, function (err, book) {
            if (book) {
                res.status(200);
                res.json(book);
            }
            else {
                res.status(500);
                res.send(err);
            }
        });


    }
}

module.exports = new BookCtrl();