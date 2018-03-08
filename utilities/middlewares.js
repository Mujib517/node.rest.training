var jwt = require('jsonwebtoken');
var config = require('../utilities/config');

module.exports = {

    isAuthenticated: function (req, res, next) {

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
    },

    validateToken: function (req, res, next) {
        var authHeader = req.headers["authorization"]; //[]
        if (authHeader) {
            var result = jwt.verify(authHeader, config.privateKey, function (err) {
                if (err) {
                    res.status(401);
                    res.send("Unauthorized");
                }
                else next();
            });
        }
        else {
            res.status(401);
            res.send("Unauthorized");
        }
    }
};