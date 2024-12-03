const asyncHandler = require("express-async-handler");
const Table = require("../../models/cashier/tableModel");
const Floor = require("../../models/cashier/floorModel");

// Create a new table
// POST foodskill/restaurant/createTable
exports.createTable = asyncHandler(async (req, res) => {
  const { tableName, tableNumber, tableChairs, floorId } = req.body;

  // Validation
  if (!tableName || !tableNumber || !floorChairs || !floorId) {
    res.status(400).json({
      success: false,
      message:
        "Please provide all required fields: tableName, tableNumber, floorChairs, floorId.",
    });
    return;
  }

  // Check if the floorId exists
  const floor = await Floor.findById(floorId);
  if (!floor) {
    res.status(404).json({
      success: false,
      message: `No floor found with ID: ${floorId}`,
    });
    return;
  }

  // Check if the table number is already in use
  const existingTable = await Table.findOne({ tableNumber });
  if (existingTable) {
    res.status(400).json({
      success: false,
      message: `A table with number ${tableNumber} already exists.`,
    });
    return;
  }

  // Create the new table
  const newTable = await Table.create({
    tableName,
    tableNumber,
    floorChairs,
    floorId,
  });

  res.status(201).json({
    success: true,
    message: "Table created successfully",
  });
});

// Get all tables
// GET foodskill/restaurant/tables
exports.getAllTable = asyncHandler(async (req, res) => {
  try {
    const tables = await Table.aggregate([
      {
        $lookup: {
          from: "floors", // The collection name for the Floor model
          localField: "floorId", // The field in the Table model
          foreignField: "_id", // The field in the Floor model
          as: "floorDetails", // Alias for the joined data
        },
      },
      {
        $unwind: "$floorDetails", // Unwind to deconstruct the floorDetails array
      },
    ]);

    res.status(200).json({
      success: true,
      total_tables: tables.length,
      data: tables,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
