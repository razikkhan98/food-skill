
// // Middleware session


const asyncHandler = require("express-async-handler");
const Session = require("../models/session/sessionModel"); // Replace with your actual session model

// Middleware to validate session tokens
exports.protectedRoute = asyncHandler(async (req, res, next) => {

    // Check if session token is provided in headers
    const sessionToken = req.headers.session;
    
    if (!sessionToken) {
        return res.status(401).json({ message: "Session token is missing" });
    }

    // Check if the session token exists in the database
    const sessionExists = await Session.findOne({ session: sessionToken });
    if (!sessionExists) {
        return res.status(401).json({ message: "Session token is invalid" });
    }

    // Attach user data from the session to the request object
    req.user = sessionExists.user; // Assuming the session has a `user` field

    // Proceed to the next middleware or route handler
    next();
});
