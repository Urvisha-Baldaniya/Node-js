const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/Data_admin");

module.exports = connect;