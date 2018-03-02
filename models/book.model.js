var mongoose = require('mongoose');

var model = mongoose.model("Book", {
    name: {
        type: String, required: [true, "Name is mandatory"],
        minlength: [3, "Minimum 3 chars"], maxlength: [10, "Max 10 chars"]
    },
    author: { type: String, required: true },
    price: {
        type: Number, required: true, validate: {
            validator: function (val) {
                return val > 100;
            },
            message: "Invalid Price"
        }
    },
    inStock: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = model;