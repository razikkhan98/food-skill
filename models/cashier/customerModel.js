const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  customer_table: {
    type: Number,
  },
  customer_mobile_no: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /^\d{10}$/.test(value),
      message: "Please enter a valid 10-digit mobile number",
    },
  },
  customer_email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
      message: "Please enter a valid email address",
    },
  },
});

module.exports = mongoose.model("Customer", customerSchema);
