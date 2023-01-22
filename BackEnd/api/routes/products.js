const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const check_auth = require('../middleware/check-auth');

const Product = require("../models/product");

const productsController = require('../controllers/products');

// Get All Products
// Method: GET
router.get("/", check_auth, productsController.products_get_all);

// Create new Product
// Method: POST
router.post("/", check_auth, productsController.products_create_product);

// Get Product By Id
// Method: GET
router.get("/:productId", productsController.products_get_by_id );

// Update Product by Id
// Method: PUT
router.put("/:productId", check_auth, productsController.products_edit);

// Delete product by Id
// Method: DELETE
router.delete("/:productId", check_auth, productsController.products_delete);

module.exports = router;
