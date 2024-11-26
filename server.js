const express = require("express");
const bodyParser = require('body-parser');
const cashierRoutes = require("./routes/cashier/cashierRoutes");
const { errorHandler } = require("./middlewares/errorHandler");
const connectDB = require('./config/database');
const session = require("express-session");
const dotenv = require("dotenv")
const MongoStore = require("connect-mongo");

dotenv.config();



// Connect to the database

connectDB();


// Initiate express app

const app = express();

const port = process.env.PORT || 5000;



// Middlewares
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());


// Routes

app.use("/foodskill/cashier", cashierRoutes);


// Start express-session middleware

app.use(
  // session({
  //   secret: "your_secret_key", // Replace with a secure key
  //   resave: false, // Avoid resaving unchanged sessions
  //   saveUninitialized: true, // Save session even if it's not modified
  //   cookie: { secure: false, maxAge: 3600000 }, // 1-hour session
  // })
  session({
    secret: "your_secret_key", // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/sessionDB" }), // Replace with your MongoDB connection string
    cookie: { secure: false, maxAge: 3600000 }, // 1-hour session
})
);


// Error handling middleware
app.use(errorHandler);

// Starting the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
