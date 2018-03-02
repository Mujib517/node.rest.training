
var Book = require('../models/book.model');

function BookCtrl() {
    this.get = function (req, res) {

        var pageSize = +req.params.pageSize || 10;
        var pageIndex = +req.params.pageIndex || 0;

        var count = 0;

        function successCount(cnt) {
            count = cnt;
            //deferred execution
            var query = Book.find()
                .sort("-lastUpdated")
                .skip(pageIndex * pageSize)
                .limit(pageSize);

            return query.exec();  //promise
        }

        function successResult(books) {
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

        function failure(err) {
            res.status(500);
            res.send("Internal Server Error");//
        }
        //fluent api
        Book.count().exec()
            .then(successCount)
            .then(successResult)
            .catch(failure);
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
        book.save()
            .then(function (savedBook) {
                res.status(201);//created
                res.send(savedBook);
            })
            .catch(function (err) {
                res.status(500);
                res.send("Internal Server Error");
            });
    }

    this.delete = function (req, res) {
        var id = req.params.id;
        Book.findByIdAndRemove(id)
            .then(function (err) {
                res.status(204); //No content
                res.send();
            })
            .catch(function () {
                res.status(500);
                res.send("Internal Server Error");

            });
    }

    this.update = function (req, res) {
        var id = req.params.id;

        Book
            .findByIdAndUpdate(id, {
                $set:
                    {
                        price: req.body.price,
                        name: req.body.name,
                        inStock: req.body.inStock,
                        author: req.body.author
                    }
            })
            .then(function (book) {
                res.status(200);
                res.json(book);
            })
            .catch(function (err) {
                res.status(500);
                res.send(err);
            });
    }
}

module.exports = new BookCtrl();