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
    }
};