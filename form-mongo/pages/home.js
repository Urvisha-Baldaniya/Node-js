const express = require("express");

const jwt = require("jsonwebtoken");
pageRoutes = express.Router();

pageRoutes.get("/",(req, res)=>{
   res.end("this is home page...")
});

// private token ==> if(token)=> {user has access to the page} else {user is not authorized}
pageRoutes.get("/about",(req, res)=>{
   // res.end("this is about page");
   let token = req.headers.authorization.split(" ")[1]
   console.log("token come to about page", token);

   //verify token
   try{
      jwt.verify(token, "node", function(err, decoded){
         if(decoded){
            res.json({msg: "welcome to the about page"});
         }
         else{
            res.satus(404).json({msg : "Login First"});
         }
      })
   }catch(error){
      res.satus(404).json({msg : "you are not authorized"});
   }

   //  if(token){
   //    res.json({msg : " welcome to the about page"});
   //  }
   //  else{
   //    res.satus(404).json({msg : "Login first"})
   //  }
 });
 pageRoutes.get("/contact",(req, res)=>{
    res.end("this is contact page...")
 });

module.exports = pageRoutes;