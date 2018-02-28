var mongoose = require('mongoose');

var model = mongoose.model("Book", {
    name: String,
    author: String,
    price: Number,
    inStock: Boolean,
    lastUpdated: Date
});

module.exports = model;