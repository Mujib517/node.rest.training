var http = require("http");
var fs = require("fs");

function handle(req, res) {

    switch (req.url) {
        case "/":
            var contents = fs.readFileSync("index.html");
            res.write(contents);
            res.end();
            break;
        case "/products":
            res.write("List of products");
            res.end();
            break;
        case "/books":
            var books = [{ id: 1, name: "Speaking JS", price: 100, inStock: true },
            { id: 2, name: "Headfirst JS", price: 200, inStock: true },
            { id: 3, name: "Eloquent JS", price: 80, inStock: false }];

            res.write(JSON.stringify(books));
            res.end();
            break;
        default:
            res.write("Hello NodeJS");
            res.end();
            break;
    }
}

var server = http.createServer(handle);
server.listen(3000, function () {
    console.log("Server is running");
});
