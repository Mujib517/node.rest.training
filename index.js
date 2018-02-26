var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/book.router');

app.listen(3000, function () {
    console.log("server is running 3000");
});

app.use(bodyParser.json());

//HTTP GET. API, Rest api, web svc, web api
app.use('/', defaultRouter);
app.use('/api/books', bookRouter);