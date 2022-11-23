const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

// Get All Products
// Method: GET
router.get("/", (req, res, next) => {
  // Find all proudtcs in DB
  Product.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Create new Product
// Method: POST
router.post("/", (req, res, next) => {
  // creating a new product object before saving it to DB
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Handling POST requests to /products",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Get Product By Id
// Method: GET
router.get("/:productId", async (req, res, next) => {
  //   Extracting product id from params;
  const id = req.params.productId;
  await Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("From DB", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update Product by Id
// Method: PUT
router.put("/:productId", (req, res, next) => {
  //   Extracting product id from params;
  const id = req.params.productId;
  const updateOps = {};
  //   Iterating through updated props
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  //   Find object by id and update propValues
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Delete product by Id
// Method: DELETE
router.delete("/:productId", (req, res, next) => {
  //   Extracting product id from params;
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
