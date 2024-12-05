const express = require("express");
const bodyParser = require("body-parser");
const cashierRoutes = require("./routes/cashier/cashierRoutes");
const { errorHandler } = require("./middlewares/errorHandler");
const connectDB = require("./config/database");
const session = require("express-session");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo");
const cors = require("cors");
// import fs from 'fs';
// import crypto from 'crypto';
dotenv.config();

// Connect to the database

connectDB();

// Initiate express app

const app = express();

const port = process.env.PORT || 9000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes

app.use("/foodskill/cashier", cashierRoutes);

// Start express-session middleware

// app.use(
//   // session({
//   //   secret: "your_secret_key", // Replace with a secure key
//   //   resave: false, // Avoid resaving unchanged sessions
//   //   saveUninitialized: true, // Save session even if it's not modified
//   //   cookie: { secure: false, maxAge: 3600000 }, // 1-hour session
//   // })
//   session({
//     secret: "your_secret_key", // Replace with your secret key
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/sessionDB" }), // Replace with your MongoDB connection string
//     cookie: { secure: false, maxAge: 3600000 }, // 1-hour session
// })
// );

// Load the private key
// const PRIVATE_KEY = fs.readFileSync('./private.pem', 'utf8');

// const decryptPayload = (encryptedPayload) => {
//   const buffer = Buffer.from(encryptedPayload, 'base64'); // Decode Base64
//   const decrypted = crypto.privateDecrypt(
//     {
//       key: PRIVATE_KEY,
//       padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//     },
//     buffer
//   );
//   return JSON.parse(decrypted.toString('utf8'));
// };

// app.use((req, res, next) => {
//   if (req.body.payload) {
//     try {
//       req.body = decryptPayload(req.body.payload); // Replace with decrypted data
//     } catch (error) {
//       return res.status(400).json({ message: 'Invalid encrypted payload' });
//     }
//   }
//   next();
// });

// Error handling middleware
app.use(errorHandler);

// Starting the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
