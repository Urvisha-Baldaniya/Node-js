

//create server
//cookie install
//login route
//store token in the cookie
//get token from the cookie ? if token? userauthorized : wrong credentioal
//logout clear token from cookie
//create a middleware for token;

const express = require("express");
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyparser.json());
app.use(cookieparser());

const port = 7000;

const middleware = (req, res, next) =>{
    const {token} = req.cookies;
    console.log(token);
    if(token && token == 'valid_token'){
        next();
    }
    else{
        console.log("Login first")
    }
}

app.post("/login",(req, res) =>{
    try{
        const {email, password} = req.body;

    if(email == "aerica@gmail.com" && password == "aerica09"){
      const token = 'valid_token';
      res.cookie('token', token);
      res.json({msg : "Login successfully", token});
    }
    else{
        res.status(401).json({msg : "wrong credentioal"});
    }
    }catch(err){
        console.log("Login first", err);
    }
})

app.post("/logout", (req, res)=>{
    res.clearCookie('token');
    res.status(200).json({msg : "Logout successfully"});
})

app.get("/contact", middleware, (req, res)=>{
        res.json({msg : "This is a contact page"});
})

app.listen(port, ()=>{
    console.log("server in running at port",port);
})