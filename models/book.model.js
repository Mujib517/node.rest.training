var mongoose = require('mongoose');

var model = mongoose.model("Book", {
    name: String,
    author: String,
    price: Number,
    inStock: Boolean,
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = model;