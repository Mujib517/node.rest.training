var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var fs = require('fs');
var os = require('os');
var cors = require('cors');
var cluster = require('cluster');

var app = express();
var config = require('./utilities/config');
var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/book.router');
var reviewRouter = require('./routes/review.router');
var userRouter = require('./routes/user.router');
var middlewares = require('./utilities/middlewares');


var port = process.env.PORT || 3000;
//round robin
// if (cluster.isMaster) {
//     for (var i = 0; i < os.cpus().length; i++) {
//         cluster.fork();
//     }
// }
// else {
app.listen(port, function () {
    console.log("server is running " + port, process.pid);
});
//}



mongoose.connect(config.conStr, function () {
    console.log("Connected");
});


var logSteam = fs.createWriteStream(__dirname + "/logs/request.log", { flags: 'a' });

//everyone has access
app.use(cors());

app.use(morgan('combined', { stream: logSteam }));

app.use(express.static("uploads/"));

app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/users', userRouter);

//app.use(middlewares.validateToken);

app.use('/api/reviews', reviewRouter);
app.use('/api/books', bookRouter);