// controllers/loginController.js

const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");
const User = require("../../models/cashier/registerModel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Session = require("../../models/session/sessionModel"); 

// Login user
// POST /foodskill/register
// Request Body: { code }

exports.loginUser = asyncHandler(async (req, res) => {
  const { code } = req.body;

  // Validate that the code is provided
  if (!code) {
    return res.status(400).json({ message: "Code is required" });
  }

  // Find the user by the provided code
  const user = await User.findOne({ code });

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid code" });
  }

  // Generate a unique session ID using uuid
  const session = uuidv4();

  // session Data Mongodb Database
  const newSession = new Session({
    session,
    userId: user._id,
  });
  // Save the session to the database
  await newSession.save();



  // Generate and send JWT token
  const token = jwt.sign(
    { user: { username: user.fullname, email: user.email, id: user._id } },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // If the user is found, login is successful
  res.status(200).json({
    success: true,
    message: "Login successful.",
    session,
    user: { fullname: user.fullname, role: user.role },
    accessToken: token,
  });
});
