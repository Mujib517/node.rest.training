
var defaultCtrl = {
    get: function (req, res) {
        logger.info("Get request made");
        res.send("Hello ExpressJS");
    },

    health: function (req, res) {
        var status = {
            health: 'Up'
        };
        //1xx information
        //2xx success
        //3xx redirects
        //4xx client errors
        //5xx server errors 

        res.status(200);
        res.json(status);
    }
};

module.exports = defaultCtrl;