require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

const PASS = process.env.PASS;

// DB Connection
mongoose.connect(
  `mongodb+srv://yarin:${PASS}@node-rest-shop.lteykdr.mongodb.net/?retryWrites=true&w=majority`
);
mongoose.Promise = global.Promise;
// MiddleWare
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, PUT, GET, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use(function (req, res, next) {
  res.set({
    serverStarted: "true",
  });
  next();
});

module.exports = app;
