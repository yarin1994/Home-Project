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
router.get("/:userId", check_auth,orderController.orders_getAll);

// Get order by ID
// Method: GET
router.post("/:userId", check_auth, orderController.add_new_item)

// Edit Order
// Method: PUT
router.put("/:orderId", check_auth, orderController.orders_edit_order);

// Delete order by id
// Method: DELETE
router.delete("/:orderId", check_auth, orderController.orders_delete_order);

module.exports = router;
