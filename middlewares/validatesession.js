// const asyncHandler = require("express-async-handler");

// // Middleware session

// exports.protectedRoute = asyncHandler(async (req, res) => {
    
//     console.log("protected", req.headers.session)

//     // Check if session is provided in the request
//     if (!req.headers.session ||!req.headers.session) {
//         return res.status(401).json({ message: "Session token is missing" });
//     }
    
//     // Check if session token is valid
//     const sessionToken = req.headers.session;
//     // Perform session validation logic here
//     // For demonstration purposes, let's assume the session token is stored in a database
//     const sessionExists = await Session.findOne({ token: sessionToken });
//     if (!sessionExists) {
//         return res.status(401).json({ message: "Session token is invalid" });
//     }
    
//     // Session is valid, proceed with the protected route
//     // You can now access the user information from the request object (req.user)
//     // For example, to retrieve the user ID:
//     const userId = req.user._id;
//     console.log("userId", userId)

//     // Perform additional authentication logic here, such as checking user permissions
    
//     // Proceed to the next middleware or route handler
//     next();



    

// });


const asyncHandler = require("express-async-handler");
const Session = require("../models/session/sessionModel"); // Replace with your actual session model

// Middleware to validate session tokens
exports.protectedRoute = asyncHandler(async (req, res, next) => {
    console.log("Protected route hit. Headers:", req.headers.session);

    // Check if session token is provided in headers
    const sessionToken = req.headers.session;
    if (!sessionToken) {
        return res.status(401).json({ message: "Session token is missing" });
    }

    // Check if the session token exists in the database
    const sessionExists = await Session.findOne({ token: sessionToken });
    console.log(sessionExists)
    if (!sessionExists) {
        return res.status(401).json({ message: "Session token is invalid" });
    }

    // Attach user data from the session to the request object
    req.user = sessionExists.user; // Assuming the session has a `user` field

    console.log("User authenticated:", req.user);

    // Proceed to the next middleware or route handler
    next();
});
