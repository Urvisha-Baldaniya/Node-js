const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/html-node-auth");

module.exports = connect;