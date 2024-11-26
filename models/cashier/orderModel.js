const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  orderQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
  orderType: {
    type: String,
    enum: ["Dine-In", "Takeaway", "Delivery"],
    required: true,
  },
  floorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
    required: true,
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: false, // Optional for non-Dine-In orders
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  orderDateTime: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Order", orderSchema);


