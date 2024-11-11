const express = require("express")
const dotenv = require("dotenv").config()
const path = require("path")
const cookieparser = require("cookie-parser");
const session = require("express-session");
const app = express()
const connection = require("./connection/db");
const authRoute = require("./routes/routes.auth");
const middle = require("./middleware/middleware");


app.use(express.json())
app.use(cookieparser());
app.use("/auth", authRoute);
app.use(express.static("public"))
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3000 }
}));


app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname , "index.html"))
})

app.get("/index.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "index.html"))
});

app.get("/charts.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "charts.html"))
});

app.get("/widgets.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "widgets.html"))
});

app.get("/tables.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "tables.html"))
});

app.get("/grid.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "grid.html"))
});

app.get("/form-basic.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "form-basic.html"))
});
app.get("/form-wizard.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "form-wizard.html"))
});

app.get("/pages-buttons.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "pages-buttons.html"))
});

app.get("/icon-material.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "icon-material.html"))
});

app.get("/icon-fontawesome.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "icon-fontawesome.html"))
});

app.get("/pages-elements.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "pages-elements.html"))
});

app.get("/index2.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "index2.html"))
});

app.get("/pages-gallery.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "pages-gallery.html"))
});

app.get("/pages-calendar.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "pages-calendar.html"))
});

app.get("/pages-invoice.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "pages-invoice.html"))
});

app.get("/pages-chat.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "pages-chat.html"))
});

app.get("/authentication-login.html",(req,res)=>{
    res.sendFile(path.join(__dirname , "authentication-login.html"))
});

app.get("/authentication-register.html",(req,res)=>{
    res.sendFile(path.join(__dirname , "authentication-register.html"))
});

app.get("/error-403.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "error-403.html"))
});

app.get("/error-404.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "error-404.html"))
});

app.get("/error-405.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "error-405.html"))
});

app.get("/error-500.html", middle, (req,res)=>{
    res.sendFile(path.join(__dirname , "error-500.html"))
});

app.listen( process.env.PORT, (req,res)=>{
    console.log("Server is running at port",process.env.PORT)
});