const User = require("../models/user");
const Token = require("../models/token");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_KEY;

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
  const { firstName, lastName, email, password } = req.body;
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "Email address already exists",
        });
      } else {
        //   Hashing the Password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              firstName: firstName,
              lastName: lastName,
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

// exports.users_login = async (req, res, next) => {
//   const { email, password } = req.body;

//   User.find({ email: email })
//     .exec()
//     .then((user) => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: "Auth Failed",
//         });
//       }
//       bcrypt.compare(password, user[0].password, (err, result) => {
//         if (err) {
//           return res.status(401).json({
//             message: "Auth Failed",
//           });
//         }
//         if (result) {
//           const token = jwt.sign(
//             {
//               email: user[0].email,
//               userId: user[0]._id,
//             },
//             `${process.env.JWT_KEY}`,
//             {
//               expiresIn: "1h",
//             }
//           );

//           return res.status(200).json({
//             message: "Auth Successfull",
//             token: token,
//             user: user,
//           });
//         }
//         return res.status(401).json({
//           message: "Auth Failed",
//         });
//       });
//     })
//     .catch((err) => {
//       //   console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };

exports.users_login = async (req, res, next) => {
  const { email, password } = req.body;

  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      bcrypt.compare(password, user[0].password, (err, result) => {
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

          // Store token in MongoDB
          const newToken = new Token({
            token: token,
            userId: user[0]._id,
          });
          newToken
            .save()
            .then((result) => {
              return res.status(200).json({
                message: "Auth Successfull",
                token: token,
                user: user,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        } else {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.users_logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("server token", secret);
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        // remove the token from server's list of valid tokens
        const userId = decoded.userId;
        deleteUserTokens(userId);
        return res.status(200).json({message: "Logout successful"});
        // invalidate the token on the client-side
      }
    });
  } else {
    return res.status(401).json({ message: "Token not found" });
  }
};

const deleteUserTokens = async (userId) => {
  try {
    const deletedTokens = await Token.deleteMany({ userId });
    return deletedTokens;
  } catch (error) {
    console.log(error);
  }
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
};
