var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var bcrypt = require('bcrypt');
var config = require('../utilities/config');
var logger = require('../utilities/logger');

var userCtrl = {

    login: function (req, res) {

        User.findOne({ username: req.body.username })
            .exec()
            .then(function (user) {
                var hashedPwd = user.password;
                var plainTextPwd = req.body.password;

                var result = bcrypt.compareSync(plainTextPwd, hashedPwd);
                if (result) {
                    var token = jwt.sign({ username: req.body.username }, config.privateKey);
                    
                    var response = {
                        username: req.body.username,
                        token: token
                    };
                    logger.info("Login Successful for " + req.body.username);
                    res.status(200);
                    res.send(response);
                }
                else {
                    logger.error("LOgin failed for " + req.body.username);
                    res.status(401);
                    res.send("Wrong username or password");
                }
            })
            .catch(function (err) {
                logger.error(err);
                res.status(401);
                res.send("Wrong username or password");
            });
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