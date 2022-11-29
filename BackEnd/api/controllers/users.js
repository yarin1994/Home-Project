const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.users_get_all = (req, res, next) => {
  User.find()
    .select("_id email password")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        users: docs.map((doc) => {
          return {
            _id: doc._id,
            email: doc.email,
            password: doc.password,
            request: {
              type: "GET",
              url: "http://localhost:5001/users/" + doc._id,
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

exports.users_add_new_user = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "Email address already exists",
        });
      } else {
        //   Hashing the Password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(200).json({
                  message: "User added successfully",
                  createdUser: {
                    _id: result._id,
                    email: result.email,
                    request: {
                      type: "POST",
                      url: "http://localhost:5001/products/" + result._id,
                    },
                  },
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.users_login = (req, res, next) => {
  const email = req.body.email;
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            `${process.env.JWT_KEY}`,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth Successfull",
            token: token,
          });
        }
        return res.status(401).json({
          message: "Auth Failed",
        });
      });
    })
    .catch((err) => {
      //   console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.users_delete = (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "User deleted",
          request: {
            type: "DELETE",
            url: "http://localhost:5001/user/" + id,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }