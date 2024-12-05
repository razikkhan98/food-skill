const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    tableName: {
      type: String,
      required: [true, "Table name is required"],
    },
    tableNumber: {
      type: Number,
      required: [true, "Table number is required"],
    },
    tableChairs: {
      type: Number,
      required: [true, "Number of chairs is required"],
    },
    tableStatus: {
      type: String,
      enum: ["Cancelled", "Reserved", "Available", "Completed"],
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Reference to the Customer schema
    },

    floorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor", // Reference to the Floor schema
      required: [true, "Floor ID is required"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Table", tableSchema);
