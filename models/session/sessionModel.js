const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    token: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now, expires: 3600 }, // Expire after 1 hour
});

module.exports = mongoose.model("Session", sessionSchema);
