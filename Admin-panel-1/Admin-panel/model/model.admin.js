const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userEmail : String,
    password : String
});

const adminModel = mongoose.model("users", userSchema);

module.exports = adminModel;