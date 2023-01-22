const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Token'
  }]
});

module.exports = mongoose.model("User", userSchema);
