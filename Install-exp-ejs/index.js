   //-----creating server with express js-------

// const express = require("express");

// const app = express();

// const port = 7676;

// app.get("/", (req, res)=>{
//     // res.json("I like study is node js..");
//     res.end("hello this is express js..!");
// })

// app.listen(port, (error)=>{
//     console.log("server is running on port",port);
// })

// console.log(express);

//MVC model view controller


const express = require("express");
const app = express();
const ejs = require("ejs");

app.use(express.urlencoded());

let studentData = [
    {
        id : 1,
        name : "urvisha",
        email : "u@gmail.com",
        number : "1234567890"
    },
    {
        id : 2,
        name : "tanvi",
        email : "t@gmail.com",
        number : "8899675849"
    },
    {
        id : 3,
        name : "priyanshi",
        email : "p@gmail.com",
        number : "9887564765"
    },
    {
        id : 4,
        name : "kavita",
        email : "k@gmail.com",
        number : "8790687568"
    }
]
const port = 8888;

app.set("view engine","ejs");

app.get("/", (req, res)=>{
    res.render("home");
})
app.get("/about", (req, res)=>{
    res.render("about",{
        student:studentData
    });
})
app.get("/contact", (req, res)=>{
    res.render("contact");
})

app.post("/addData",(req, res)=>{
    console.log(req.body);
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let number = req.body.number;

    let obj = {
        id : id,
        name : name,
        email : email,
        number : number
    }
    studentData.push(obj);
    res.redirect('back');
})

app.listen(port, (error)=>{
    if(error){
       console.log("Something went wrong");
    }
    console.log("server is running on port",port);
})


