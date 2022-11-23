const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");

router.get("/", (req, res, next) => {
  Order.find()
  .select('_id quantity product')
  .exec()
  .then(docs => {
      res.status(200).json({
          count: docs.length
      })
  })
  .catch(err => {
      res.status(500).json({
          error: err
      })
  })
});

router.post("/", (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId,
  });
  order
    .save()
    .then((result) => {
      res.status(201).json({
          _id: result._id,
          quantity: result.quantity,
          product: result.product
      });
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.put("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
  
    res.status(200).json({
    message: "Updated orders",
    id: req.params.orderId,
  });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted orders",
    id: req.params.orderId,
  });
});

module.exports = router;
