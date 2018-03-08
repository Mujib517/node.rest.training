var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();
var config = require('./utilities/config');
var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/book.router');
var reviewRouter = require('./routes/review.router');
var userRouter = require('./routes/user.router');
var middlewares = require('./utilities/middlewares');

app.listen(3000, function () {
    console.log("server is running 3000");
});

mongoose.connect(config.conStr, function () {

    console.log("Connected");
});

app.use(express.static("uploads/"));

app.use(bodyParser.json());

//HTTP GET. API, Rest api, web svc, web api
app.use('/', defaultRouter);
app.use('/api/users', userRouter);

app.use(middlewares.validateToken);

app.use('/api/reviews', reviewRouter);
app.use('/api/books', bookRouter);