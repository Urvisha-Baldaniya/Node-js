const express = require("express");
const bcrypt = require("bcrypt");
const user = require("../model/model.reg");
const jwt = require("jsonwebtoken");
const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
    try{
        console.log(req.body);
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "Please fill in all fields."});
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = new user({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ msg: "user added successfully", newUser });

    }catch(error){
        res.status(500).json({msg : "server error", error: error.message});
    }
})

//login
authRoutes.post("/login", async (req, res) => {
    try{
        console.log(req.body)
    const { email, Loginpassword } = req.body;

    if(!email || !Loginpassword){
        return res.status(400).json({message: "Email and password are required"});
    }

    const checkUser = await user.findOne({ email });
    console.log(checkUser);
    if (!checkUser) {
        res.status(400).json({ msg: "wrong credentials" });
    }
    else {
        const matchedPass = bcrypt.compare(Loginpassword, checkUser.password);

        if (!matchedPass) {
            
            res.status(400).json({ msg: "Wrong..." });
        }
        else{
            let token = jwt.sign({course : "node"}, "node");
            console.log(token, "token");
            res.status(200).json({ msg: "login successful", token });
        }
    }
    }catch(error){
        res.status(500).json({msg : "server error", error: error.message});
    }


});


module.exports = authRoutes;