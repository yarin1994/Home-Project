const Product = require("../models/product");
const mongoose = require("mongoose");

exports.products_get_all = (req, res, next) => {
  // Find all proudtcs in DB
  Product.find()
    // select() lets us choose which values we want to return
    .select("name price _id")
    .then((docs) => {
      // Returning a better response with more data.
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5001/products/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.products_create_product = (req, res, next) => {
  // creating a new product object before saving it to DB
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        message: "Handling POST requests to /products",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "POST",
            url: "http://localhost:5001/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      // console.log('error is', err);
      res.status(500).json({ error: err });
    });
};

exports.products_get_by_id = async (req, res, next) => {
  //   Extracting product id from params;
  const id = req.params.productId;
  await Product.findById(id)
    .exec()
    .then((doc) => {
      // console.log("From DB", doc);
      if (doc) {
        res.status(200).json({
          name: doc.name,
          price: doc.price,
          _id: doc._id,
          request: {
            type: "GET",
            url: "http://localhost:5001/products/" + doc._id,
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.products_edit = (req, res, next) => {
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
      // console.log(result);
      res.status(200).json({
        result: result,
        _id: id,
        request: {
          type: "GET",
          url: "http://localhost:5001/products/" + id,
        },
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.products_delete = (req, res, next) => {
    //   Extracting product id from params;
    const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json({
          result: result,
          _id: id,
  
          request: {
            type: "DELETE",
            url: "http://localhost:5001/products/" + id,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
