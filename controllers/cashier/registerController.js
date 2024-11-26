// controllers/registerController.js

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const registerModel = require("../../models/cashier/registerModel");
const generateCode = require("../../utils/code");
const roleMapping = require("../../utils/roleMapping");

// register
// POST /api/register
// Register a new user
// Request Body: { fullname, email, password, confirmpassword,  mobileNum, altNum, address, role, joining }
// Returns: { success, message }
// Note: Password should be hashed before saving to the database
// Note: Email and mobileNum should be unique
// Note : Generate the code based on role and mobile number

exports.register = asyncHandler(async (req, res, next) => {
  const {
    fullname,
    email,
    password,
    confirmpassword,
    mobileNum,
    altNum,
    address,
    role,
    joining,
    salary,
    age
  } = req.body;

  // Validate the input data
  if (
    !fullname ||
    !email ||
    !password ||
    !confirmpassword ||
    !mobileNum ||
    !address ||
    !role ||
    !joining
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Verify role and get role_id
  const role_id = roleMapping[role];
  if (!role_id) {
    return res.status(400).json({ message: "Invalid role" });
  }

  // Check if passwords match
  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if user already exists by mobile number
    const existingUserByMobile = await registerModel.findOne({ mobileNum });
    if (existingUserByMobile) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    // Generate code based on role, role_id, and mobile number
    const code = generateCode(role, mobileNum, role_id);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword1 = await bcrypt.hash(password, 10);

    // Create a new user document
    const user = new registerModel({
      fullname,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword1,
      mobileNum,
      altNum,
      address,
      role,
      role_id,
      joining,
      code,
      salary,
      age,
    });

    // Save the new user to the database
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Database error:", error); // Log the error for debugging
    res.status(500).json({ message: "Database error", error: error.message });
  }
});
