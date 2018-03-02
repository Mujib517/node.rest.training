var mongoose = require('mongoose');

var model = mongoose.model("Review", {
    bookId: { type: String },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    subject: { type: String },
    message: { type: String },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = model;