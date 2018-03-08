var mongoose = require('mongoose');

module.exports = mongoose.model("User", {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: Date.now }
});