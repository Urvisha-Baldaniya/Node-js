const express = require("express");

const auth = require("../model/model.auth");
const authRoutes = express.Router();

authRoutes.post("/register", async (req, res)=>{
    try{
     console.log(req.body);
     const {name, email}= req.body;

     const data = new auth({name, email});
     await data.save();
     res.json({msg : "user added..!"})
    }catch(error){
        console.log("error");
    }
})

module.exports = authRoutes;