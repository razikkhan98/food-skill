const asyncHandler = require("express-async-handler");
const Billing = require("../../models/cashier/billingModel");
const Order = require("../../models/cashier/orderModel");
const Customer = require("../../models/cashier/customerModel");
const Menu = require("../../models/cashier/customerMenuModel");
const Floor = require("../../models/cashier/floorModel");

// POST: /foodskill/restaurant/create/billing
exports.billingOrder = asyncHandler(async (req, res) => {
  const { customerId, menuId, floorId, orderId, totalAmount } = req.body;

  // Validate required fields
  if (!customerId || !menuId || !floorId || !orderId || !totalAmount) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields: customerId, menuId, floorId, orderId, and totalAmount",
    });
  }

  // Check if the customer exists
  const customerExists = await Customer.findById(customerId);
  if (!customerExists) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  // Check if the menu item exists
  const menuExists = await Menu.findById(menuId);
  if (!menuExists) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  // Check if the floor exists
  const floorExists = await Floor.findById(floorId);
  if (!floorExists) {
    return res.status(404).json({
      success: false,
      message: "Floor not found",
    });
  }

  // Check if the order exists
  const orderExists = await Order.findById(orderId);
  if (!orderExists) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Create and save the billing record
  const newBilling = new Billing({
    customerId,
    menuId,
    floorId,
    orderId,
    totalAmount,
  });

  const savedBilling = await newBilling.save();

  res.status(201).json({
    success: true,
    message: "Billing created successfully",
    data: savedBilling,
  });
});




// GET: /foodskill/restaurant/create/getallbilling
exports.getAllBillings = asyncHandler(async (req, res) => {
  try {
    const billings = await Billing.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerDetails",
        },
      },
      {
        $lookup: {
          from: "menus",
          localField: "menuId",
          foreignField: "_id",
          as: "menuDetails",
        },
      },
      {
        $lookup: {
          from: "floors",
          localField: "floorId",
          foreignField: "_id",
          as: "floorDetails",
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "orderId",
          foreignField: "_id",
          as: "orderDetails",
        },
      },
      { $unwind: "$customerDetails" },
      { $unwind: "$menuDetails" },
      { $unwind: "$floorDetails" },
      { $unwind: "$orderDetails" },
    ]);

    res.status(200).json({
      success: true,
      totalBillings: billings.length,
      message: "Billings retrieved successfully",
      data: billings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving billings",
      error: error.message,
    });
  }
});
