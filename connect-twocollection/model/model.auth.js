const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    name: String,
    email: String,
})

const authModel = mongoose.model("user", authSchema);

module.exports = authModel;