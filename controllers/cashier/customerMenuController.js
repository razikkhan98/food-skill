// controllers/customerMenuController.js

const asyncHandler = require("express-async-handler");
const CustomerMenu = require("../../models/cashier/customerMenuModel");



// Create a new menu item
// POST foodskill/customer/menu


exports.createMenu = asyncHandler(async (req, res) => {
  const { category, subcategories } = req.body;

  // Validate required fields
  if (!category || !subcategories || !subcategories.length) {
    return res.status(400).json({
      success: false,
      message: "Category and at least one subcategory are required",
    });
  }

  try {
    // Check if the same menu item (category + subcategory name) already exists
    const duplicate = await CustomerMenu.findOne({
      category,
      "subcategories.name": { $in: subcategories.map((sub) => sub.name) },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Menu item with the same name already exists in this category",
      });
    }

    // Create a new menu item
    const menu = new CustomerMenu(req.body);
    const savedMenu = await menu.save();

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      // data: savedMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create menu item",
      error: error.message,
    });
  }
});



// Get all menu items
// GET /api/menu
// Public
exports.getAllMenus = asyncHandler(async (req, res) => {
  try {
    // Fetch all menu items, optionally sorted by category
    const menuItems = await CustomerMenu.find().sort({ category: 1 });

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menu items found",
      });
    }

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu items",
      error: error.message,
    });
  }
});

