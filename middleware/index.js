const express = require("express");
const ejs = require("ejs");
const app = express();

const checkpost = (req, res, next)=>{
    console.log(req.query.age);
  if(req.query.age >= 18){
    return next();
  }
  return res.redirect("/");
};

const port = 40000;

app.set("view engine","ejs");

app.get("/",(req, res)=>{
    return res.end("hello world");
});
app.get("/home", checkpost, (req, res)=>{
   res.render("home"); 
});



app.use(checkpost());
app.listen(port,(err)=>{
    if(err){
        console.log("something went wrong");
    }
    console.log("server is running at port",port);
})