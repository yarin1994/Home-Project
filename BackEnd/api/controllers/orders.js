const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.orders_getAll = (req, res, next) => {
  const user_id = req.params.userId;
  Order.find({user_id: user_id})
    .select("_id quantity product product_name price")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          console.log(`docsss`, doc)
          return {
            _id: doc._id,
            quantity: doc.quantity,
            product_name: doc.product_name,
            product_id: doc.product,
            price: doc.price,
            request: {
              type: "GET",
              url: "http://localhost:5001/orders/" + doc._id,
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
};

exports.add_new_item = (req, res, next) => {
  const user_id = req.params.userId;
  User.findById({ _id: user_id })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not exist",
        });
      }
      Order.findOne({ user_id: user_id, product: req.body.product })
        .exec()
        .then((order) => {
          if (order) {
            Order.updateOne(
              { _id: order._id },
              { $inc: { quantity: 1 } }
            )
              .exec()
              .then(() => {
                res.status(200).json({
                  order: order,
                  message: "Quantity has benn updated successfully",
                });
              });
          } else {
            const cart = new Order({
              _id: new mongoose.mongoose.Types.ObjectId(),
              user_id: user_id,
              product: req.body.product,
              product_name: req.body.product_name,
              price: req.body.price
            });
            return cart
              .save()
              .then((result) => {
                console.log("resultiiiii", result);
                res.status(200).json({
                  _id: result._id,
                  user_id: result.user_id,
                  product: result.product,
                  product_name: result.product_name,
                  quantity: result.quantity,
                  price: result.price
                });
              })
              .catch((err) => {
                res.status(505).json({ error: err });
              });
          }
        });
    });
};


exports.orders_edit_order = (req, res, next) => {
  const id = req.params.orderId;
  
  Order.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        result: result,
        _id: id,
        request: {
          type: "PUT",
          url: "http://localhost:5001/orders/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_delete_order = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Order not found!",
        });
      }
      res.status(200).json({
        result: result,
        _id: id,
        request: {
          type: "DELETE",
          url: "http://localhost:5001/orders/" + id,
        },
      });
    });
};
