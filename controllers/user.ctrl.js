var jwt = require('jsonwebtoken');

var userCtrl = {

    login: function (req, res) {

        if (req.body.username === 'admin' && req.body.password === 'password') {

            var token = jwt.sign({ username: req.body.username }, 'secret');

            var response = {
                username: req.body.username,
                token: token
            };
            res.status(200);
            res.send(response);
        }
        else {
            res.status(401);
            res.send("Wrong Credentials");
        }
    }
};

module.exports = userCtrl;