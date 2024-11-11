const express = require("express");
const app = express();
const ejs = require("ejs");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const port = 5000;

app.set("view engine","ejs");

app.configure(function() {
    app.use(express.cookieParser('keyboard cat'));
    app.use(express.session({ cookie: { maxAge: 60000 }}));
    app.use(flash());
  });

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.get("/",(req, res)=>{
    res.send({msg : "hello"});
})

app.listen(port, ()=>{
    console.log("server in running at port",port);
})