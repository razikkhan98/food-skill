const asyncHandler = require("express-async-handler");
const Table = require("../../models/cashier/tableModel");
const Floor = require("../../models/cashier/floorModel");

// Create a new table
// POST foodskill/restaurant/createTable
exports.createTable = asyncHandler(async (req, res) => {
  const { tableName, tableNumber, tableChairs, floorId } = req.body;

  // Validation
  if (!tableName || !tableNumber || !tableChairs || !floorId) {
    res.status(400).json({
      success: false,
      message:
        "Please provide all required fields: tableName, tableNumber, tableChairs, floorId.",
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
  const existingTable = await Table.findOne({
    tableNumber,
    floorId: floor?._id,
  });
  if (existingTable) {
    res.status(400).json({
      success: false,
      message: `A table with number ${tableNumber} already exists.`,
    });
    return;
  }

  // Create the new table
  await Table.create({
    tableName,
    tableNumber,
    tableChairs,
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
        $lookup: {
          from: "customers", // The collection name for the Customer model
          localField: "customerId", // The field in the Table model
          foreignField: "_id", // The field in the Customer model
          as: "customerDetails", // Alias for the joined data
        },
      },
      {
        $unwind: {
          path: "$floorDetails",
          preserveNullAndEmptyArrays: true, // Keep documents without matching floorDetails
        },
      },
      {
        $unwind: {
          path: "$customerDetails",
          preserveNullAndEmptyArrays: true, // Keep documents without matching customerDetails
        },
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

// POST foodskill/restaurant/updateTableStatus
exports.updateTableStatusById = asyncHandler(async (req, res) => {
  const { tableId, tableStatus } = req.body;

  // Validation
  if (!tableId || !tableStatus) {
    res.status(400).json({
      success: false,
      message: "Please provide all required fields: tableId.",
    });
    return;
  }

  const updateTableStatus = await Table.findByIdAndUpdate(
    { _id: tableId },
    { $set: { tableStatus } },
    { new: true }
  );
  

  res.status(201).json({
    success: true,
    message: "Table update successfully",
  });
});
