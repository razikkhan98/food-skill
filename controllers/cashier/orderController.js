const asyncHandler = require("express-async-handler");
const Order = require("../../models/cashier/orderModel");
const Floor = require("../../models/cashier/floorModel");
const Table = require("../../models/cashier/tableModel");
const Customer = require("../../models/cashier/customerModel");
const Menu = require("../../models/cashier/customerMenuModel");

// Create a new order
// POST: foodskill/restaurant/create/orders

exports.createOrder = asyncHandler(async (req, res) => {
  const {
    orderDetails,
    orderQuantity,
    orderStatus,
    orderType,
    floorId,
    tableId,
    customerId,
    totalAmount,
  } = req.body;

  // Validate required fields
  if (!orderDetails || !orderType || !floorId || !customerId || !totalAmount) {
    res.status(400).json({
      success: false,
      message:
        "Required fields: menuId, orderQuantity, orderType, floorId, customerId",
    });
    return;
  }

  // Validate orderQuantity is a positive number
  // if (typeof orderQuantity !== "number" || orderQuantity < 1) {
  //   res.status(400).json({
  //     success: false,
  //     message: "Order quantity must be a positive number",
  //   });
  //   return;
  // }

  // Check if tableId exists (only for Dine-In orders)
  const validOrderTypes = ["Dine-In", "Takeaway", "Delivery"];
  if (!validOrderTypes.includes(orderType)) {
    res.status(400).json({
      success: false,
      message: `Order type must be one of: ${validOrderTypes.join(", ")}`,
    });
    return;
  }

  try {
    // Check if floorId exists
    const floorExists = await Floor.findById(floorId);
    if (!floorExists) throw new Error("Specified floor does not exist");

    if (orderType === "Dine-In") {
      const tableExists = await Table.findById(tableId);
      if (!tableExists) throw new Error("Specified table does not exist");
      if (tableExists.floorId.toString() !== floorId)
        throw new Error("Table does not belong to the specified floor");
    }

    // Check if customerId exists
    const customerExists = await Customer.findById(customerId);
    if (!customerExists) throw new Error("Specified customer does not exist");

    // Check if menuId exists
    // const menuExists = await Menu.findById(menuId);
    // if (!menuExists) throw new Error("Specified menu item does not exist");

    // Create and save the order
    const newOrder = new Order({
      // menuId,
      orderDetails,
      orderQuantity,
      orderStatus: orderStatus || "Pending",
      orderType,
      floorId,
      tableId: orderType === "Dine-In" ? tableId : null,
      customerId,
      totalAmount,
      orderDateTime: new Date(),
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// Get all orders fields
// GET: foodskill/restaurant/create/getallorder
exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.aggregate([
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
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "tableDetails",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerDetails",
        },
      },
      { $unwind: { path: "$menuDetails", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$floorDetails", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$tableDetails", preserveNullAndEmptyArrays: true } },
      {
        $unwind: { path: "$customerDetails", preserveNullAndEmptyArrays: true },
      },
    ]);

    res.status(200).json({
      success: true,
      total_orders: orders.length,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: err.message,
    });
  }
});
