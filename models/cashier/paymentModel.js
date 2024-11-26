const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Billing",
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Cash", "Online", "Bank Transfer", "Wallet"],
    required: true,
  },
  offerDiscount: {
    type: Number,
    default: 0,
  },
  couponCode: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  paymentDateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
