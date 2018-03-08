var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var bcrypt = require('bcrypt');

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
    },

    register: function (req, res) {

        var hash = bcrypt.hashSync(req.body.password, 2);
        req.body.password = hash;

        var user = new User(req.body);
        user.save()
            .then(function (user) {
                res.status(201);
                var jsonUser = user.toJSON();
                delete jsonUser.password;
                delete jsonUser.__v;
                res.json(jsonUser);
            })
            .catch(function (err) {
                res.status(500);
                if (err && err.errmsg && err.errmsg.indexOf("duplicate key error") > -1) {
                    res.send("User already exists");
                }
                else {
                    res.send(err);
                }

            });
    }
};

module.exports = userCtrl;