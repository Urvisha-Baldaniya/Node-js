const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
  name: String,
  cvv: Number,
  expiryDate: String
});

const payModel = mongoose.model("payment", paySchema);

module.exports = payModel;