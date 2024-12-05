const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  session: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now, expires: 86400 }, // Expire after 3600 seconds = 1 hour, // 2592000 seconds = 30 day, // 86400 seconds = 1 day
});

module.exports = mongoose.model("Session", sessionSchema);
