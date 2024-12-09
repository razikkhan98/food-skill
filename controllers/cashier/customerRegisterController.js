// controllers/customerRegisterController.js
const asyncHandler = require("express-async-handler");
const Customer = require("../../models/cashier/customerModel");
const Table = require("../../models/cashier/tableModel");

// Register new customer
// POST /api/customer/register

exports.registerCustomer = asyncHandler(async (req, res) => {
  try {
    const {
      customer_name,
      customer_mobile_no,
      customer_email,
      tableId,
      tableStatus,
    } = req.body;

    if (!customer_name || !customer_mobile_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const customer = await Customer.create({
      customer_name,
      customer_mobile_no,
      customer_email,
      customer_table_Id: tableId,
    });

    // Validation
    if (tableId && tableStatus) {
      // update table Status
      const updateTableStatus = await Table.findByIdAndUpdate(
        { _id: tableId },
        { $set: { tableStatus, customerId: customer?._id } },
        { new: true }
      );
      console.log("updateTableStatus: ", updateTableStatus);
    }

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      customer_status: "Table_Order",
      data: customer,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

// Get All Customer

exports.getAllCustomers = asyncHandler(async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});
