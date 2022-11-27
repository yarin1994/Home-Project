const express = require("express");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const usersController = require('../controllers/users');

// Get All users
// Method: GET
router.get("/", usersController.users_get_all);

// Adding new user details
// Method: POST
router.post("/signup", usersController.users_add_new_user);

// Log in method
// Method: POST
router.post("/login", usersController.users_login);

// Delete User by ID
// Method: DELETE
router.delete("/:userId", usersController.users_delete);

module.exports = router;
