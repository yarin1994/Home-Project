const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const check_auth = require('../middleware/check-auth')

const Order = require("../models/order");
const Product = require("../models/product");

// Get All Orders
// Method: GET
router.get("/", check_auth,(req, res, next) => {
  Order.find()
    .select("_id quantity product")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            quantity: doc.quantity,
            product: doc.product,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Add new Order
// Method: POST
router.post("/", check_auth,(req, res, next) => {
  Product.findById(req.body.productId)
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      return order
        .save()
        .then((result) => {
          res.status(201).json({
            _id: result._id,
            quantity: result.quantity,
            product: result.product,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Product Id not exist",
        error: err,
      });
    });
});

// Edit Order
// Method: PUT
router.put("/:orderId", check_auth,(req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Order.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        result: result,
        _id: id,
        request: {
          type: "PUT",
          url: "http://localhost:3000/orders/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Delete order by id
// Method: DELETE
router.delete("/:orderId", check_auth,(req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then((result) => {
      if (!result) {
          res.status(404).json({
              message: "Order not found!"
          })
      }
      res.status(200).json({
        result: result,
        _id: id,
        request: {
          type: "DELETE",
          url: "http://localhost:3000/orders/" + id,
        },
      });
    });
});

module.exports = router;
