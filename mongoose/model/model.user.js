const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password : String,
  email : String
});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;