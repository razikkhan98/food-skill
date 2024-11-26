

const asyncHandler = require("express-async-handler");
const Floor = require("../../models/cashier/floorModel");

// Create a new floor
// POST foodskill/restaurant/createFloor
exports.createFloor = asyncHandler(async (req, res) => {
  const { floorName, floorNumber, floorCapacity } = req.body;

  // Validation
  if (!floorName || !floorNumber || !floorCapacity) {
    res.status(400).json({
      success: false,
      message: "Please provide all required fields: floorName, floorNumber, floorCapacity.",
    });
    return;
  }

  // Check if the floor already exists
  const existingFloor = await Floor.findOne({ floorNumber });
  if (existingFloor) {
    res.status(400).json({
      success: false,
      message: `A floor with number ${floorNumber} already exists.`,
    });
    return;
  }

  // Create new floor
  const newFloor = await Floor.create({
    floorName,
    floorNumber,
    floorCapacity,
  });

  res.status(201).json({
    success: true,
    message: "Floor created successfully",
    data: newFloor,
  });
});

// Get all floors
// GET foodskill/restaurant/floors
exports.getAllFloors = asyncHandler(async (req, res) => {
  const floors = await Floor.find();

  res.status(200).json({
    success: true,
    count: floors.length,
    data: floors,
  });
});
