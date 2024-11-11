const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    proName: String,
    price: Number,
    rating: Number,
    category: String,
    quantity: Number,
    description: String
});

const adminModel = mongoose.model("product", productSchema);

module.exports = adminModel;