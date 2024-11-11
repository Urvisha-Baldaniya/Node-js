const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    username : String,
    email: String,
    password: String,
    otp: String,
    otpExpires:String
})

const userModel = mongoose.model("userdata", authSchema);

module.exports = userModel;