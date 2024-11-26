// // models/menuModel.js
// const mongoose = require("mongoose");

// const menuSchema = new mongoose.Schema({
//   menu_name: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 3,
//     maxlength: 50,
//   },
//   menu_image: {
//     type: Number,
//     required: true,
//   },
//   menu_price: {
//     type: String,
//     trim: true,
//   },
//   menu_status: {
//     type: String,
//     trim: true,
//     enum: ["Available", "Not Available"],
//     default: "Available",
//   },
// });

// module.exports = mongoose.model("Menu", menuSchema);


const mongoose = require('mongoose');

// Schema for Add-ons
const AddOnSchema = new mongoose.Schema({
  option: { type: String, required: false},
  price: { type: Number, required: false },
});

// Schema for Subcategories
const SubcategorySchema = new mongoose.Schema({
  // id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  foodImg: { type: String, required: true },
  add_ons: [AddOnSchema],
});

// Schema for Categories
const CategorySchema = new mongoose.Schema({
  // id: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  subcategories: [SubcategorySchema],
});

module.exports = mongoose.model('Menu', CategorySchema);
