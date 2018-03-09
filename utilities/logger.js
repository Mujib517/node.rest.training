var fs = require('fs');


var bunyan = require('bunyan');
var logStream = fs.createWriteStream(__dirname + "/" + "app.log", { flags: 'a' });
var errorStream = fs.createWriteStream(__dirname + "/" + "error.log", { flags: 'a' });

var logger = bunyan.createLogger({
    name: 'myLogger',
    streams: [
        {
            level: 'info',
            stream: logStream
        },
        {
            level: 'error',
            stream: errorStream
        }
    ]
});

module.exports = logger;