// controllers/customerRegisterController.js
const asyncHandler = require("express-async-handler");
const Customer = require("../../models/cashier/customerModel");

// Register new customer
// POST /api/customer/register

exports.registerCustomer = asyncHandler(async (req, res) => {
  const { customer_name, customer_mobile_no, customer_email, customer_table } =
    req.body;

  if (!customer_name || !customer_mobile_no) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const customer = await Customer.create({
      customer_name,
      customer_mobile_no,
      customer_email,
      customer_table,
    });
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
