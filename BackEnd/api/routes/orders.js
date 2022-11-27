const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const check_auth = require('../middleware/check-auth')

const Order = require("../models/order");
const Product = require("../models/product");

const orderController = require('../controllers/orders');
const order = require("../models/order");

// Get All Orders
// Method: GET
router.get("/", check_auth,orderController.orders_getAll);

// Add new Order
// Method: POST
router.post("/", check_auth, orderController.orders_add_new);

// Edit Order
// Method: PUT
router.put("/:orderId", check_auth, orderController.orders_edit_order);

// Delete order by id
// Method: DELETE
router.delete("/:orderId", check_auth, orderController.orders_delete_order);

module.exports = router;
