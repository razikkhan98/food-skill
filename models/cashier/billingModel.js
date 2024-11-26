const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  floorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  billingDateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Billing", billingSchema);
