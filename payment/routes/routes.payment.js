const express = require("express");

const user = require("../model/model.payment");
const stripe = require("stripe");
const userRoutes = express.Router();

userRoutes.post("/payments", (req, res)=>{

});

userRoutes.get("/paymentPage", (req, res)=>{
    res.render("paymentPage");
});

module.exports = userRoutes;