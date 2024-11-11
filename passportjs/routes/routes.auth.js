const express = require("express");
const passport = require("passport");
const auth = require("../model/model.auth");
const authRoutes = express.Router();

authRoutes.post("/register", async (req, res)=>{
 const {username, password} = req.body;
 try{
   if(!username &&  !password){
     return res.json({msg : "username and password is required"})
   }

   const user = new auth({username, password});
   await user.save();
   res.status(200).json({msg : "user registered successfully"});
 }catch(error){
   res.status(400).json({msg : "something went wrong", error});
 }
});

// authRoutes.post("/login", (req, res)=>{
//   const {username, password} = req.body;
//   try{
//     if(!username && password){
//         return res.json({msg : "username and password is required"})
//       }
//    let user = auth.findOne({username});
//    console.log(user);

//    if(!user){
//      return res.json({msg : "user not found"});
//    }
//    if(user.password !== password){
//     return res.json({msg : "password is incorrected"});
//    }

//    res.status(200).json({msg : "Login successfully"});
//   }catch(error){
//     res.status(400).json({msg : "something went wrong", error});
//   }
// });/

// ,{ failureRedirect: '/auth/login' }

authRoutes.post('/login', 
    passport.authenticate('local'),
    function(req, res) {
      // res.redirect('/home');
    console.log("login successfully")
    });

authRoutes.get("/registerPage", (req, res)=>{
    res.render("signup");
});

authRoutes.get("/loginPage", (req, res)=>{
    res.render("login");
})

module.exports = authRoutes;