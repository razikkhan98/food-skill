// models/registerModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 100,
  },
  confirmpassword: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 100,
  },
  mobileNum: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  altNum: {
    type: Number,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 200,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    enum: ["Admin", "Cashier", "Staff", "Captain", "Chef"],
  },
  role_id: {
    type: String,
    ref: "Role",
    required: true,
  },

  joining: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  salary: {
    type: Number,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("User", userSchema);
