var Review = require('../models/reviews.model');

function ReviewCtrl() {

    this.save = function (req, res) {

        var review = new Review(req.body);
        review.save()
            .then(function (review) {
                res.status(201);
                res.send(review)
            })
            .catch(function (err) {
                res.status(500);
                res.send("Internal Server Error");
            });
    }
}

var ctrl = new ReviewCtrl();
module.exports = ctrl;