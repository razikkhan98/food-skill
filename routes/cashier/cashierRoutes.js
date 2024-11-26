// routes/user.routes.js
const express = require('express');
const router = express.Router();
const registerController = require("../../controllers/cashier/registerController")
const loginController = require("../../controllers/cashier/loginController")
const customerRegisterController = require("../../controllers/cashier/customerRegisterController")
const customerMenuController = require("../../controllers/cashier/customerMenuController")
const currentController = require("../../controllers/cashier/currentController");
const floorController = require("../../controllers/cashier/floorController");
const tableController = require("../../controllers/cashier/tableController");
const orderController = require("../../controllers/cashier/orderController");
const billingController = require("../../controllers/cashier/billingController");
const paymentController = require("../../controllers/cashier/paymentController");
const { validateToken } = require("../../middlewares/validateTokenHandler");
const { protectedRoute } = require("../../middlewares/validatesession");


/// User Register (No Token Required)
router.post('/register', registerController.register);

// User Login (No Token Required)
router.post('/login', loginController.loginUser);

// Customer Register (Protected Routes)
router.post('/customer/register',validateToken, customerRegisterController.registerCustomer);

// Menu (Protected Routes)
router.post('/customer/menu',protectedRoute, validateToken, customerMenuController.createMenu);
router.get('/customer/allmenu',protectedRoute, validateToken, customerMenuController.getAllMenus);

// Floor (Protected Routes)
router.post('/restaurant/createFloor', validateToken, floorController.createFloor);
router.get('/restaurant/getallFloor', validateToken, floorController.getAllFloors);

// Table (Protected Routes)
router.post('/restaurant/createTable', validateToken, tableController.createTable);
router.get('/restaurant/getTable', validateToken, tableController.getAllTable);

// Order (Protected Routes)
router.post('/restaurant/create/order', validateToken, orderController.createOrder);
router.get('/restaurant/create/getallorder', validateToken, orderController.getAllOrders);

// Billing (Protected Routes)
router.post('/restaurant/billing/order', validateToken, billingController.billingOrder);
router.get('/restaurant/billing/getallorder', validateToken, billingController.getAllBillings);

// Payment (Protected Routes)
router.post('/restaurant/payment/order', validateToken, paymentController.paymentOrder);
router.get('/restaurant/payment/getallorder', validateToken, paymentController.getAllPayments);

// Get Current User (Protected Route)
router.get('/current', currentController.currentUser);
 
module.exports = router;