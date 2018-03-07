
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var config = require('./utilities/config');
var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/book.router');
var reviewRouter = require('./routes/review.router');

app.listen(3000, function () {
    console.log("server is running 3000");
});

mongoose.connect(config.conStr, function () {
    console.log("Connected");
});

app.use(express.static("uploads/"));

app.use(bodyParser.json());


function isAuthenticated(req, res, next) {

    var authHeader = req.headers["authorization"];

    if (authHeader) {
        var tokens = authHeader.split(' ');
        var buf = new Buffer(tokens[1], 'base64');
        var credentials = buf.toString().split(':');

        if (credentials[0] === 'admin' && credentials[1] === 'password') next();
        else {
            res.status(401);
            res.send("Unauthorized");
        }
    }
    else {
        res.status(401);
        res.send("Unauthorized");
    }
}


//HTTP GET. API, Rest api, web svc, web api
app.use('/', defaultRouter);

app.use(isAuthenticated);
app.use('/api/reviews', reviewRouter);
app.use('/api/books', bookRouter);