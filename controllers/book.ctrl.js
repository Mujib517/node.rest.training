var books = [{ id: 1, name: 'Speaking Javascript', price: 100, inStock: true },
{ id: 2, name: 'Headfirst Javascript', price: 200, inStock: true },
{ id: 3, name: 'Eloquent Javascript', price: 120, inStock: false }];

function BookCtrl() {
    this.get = function (req, res) {
        res.json(books);
    }

    this.getById = function (req, res) {
        var id = +req.params.id;
        var result;
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                result = books[i];
            }
        }
        if (result) {
            res.status(200);
            res.json(result);
        }
        else {
            res.status(404);
            res.send("Not found");
        }

    }

    this.save = function (req, res) {

        books.push(req.body);

        res.status(201);//created
        res.send(req.body);
    }
}

module.exports = new BookCtrl();