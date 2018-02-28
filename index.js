var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/book.router');

app.listen(3000, function () {
    console.log("server is running 3000");
});

mongoose.connect("mongodb://localhost:27017/mybooksdb", function () {
    console.log("Connected");
});


app.use(bodyParser.json());

//HTTP GET. API, Rest api, web svc, web api
app.use('/', defaultRouter);
app.use('/api/books', bookRouter);