const express = require("express");
const ejs = require("ejs");
const app = express();

app.use(express.urlencoded({extended : true}));

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

const port = 7777;

app.set("view engine","ejs");

app.get("/", (req, res)=>{
    res.render("home");
})
app.get("/forms", (req, res)=>{
    res.render("forms",{
        student : studentData
    });
});

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
    res.redirect("back");
})

app.get("/delete", (req, res) =>{
    // console.log(req.query.id);
    let userId = Number(req.query.id);
    studentData = studentData.filter((item)=> item.id !== userId );
    res.redirect("back");
})

app.get("/edit", (req, res)=>{
//    console.log(Number(req.query.id));

 let editId = Number(req.query.id);
 console.log(editId)

 let foundEditData = studentData.find((item)=> item.id === editId)

//  console.log("editData",foundEditData[0]);

 res.render("editData",{editData : foundEditData})
});

app.post("/editData",(req, res)=>{
    console.log(req.body);
    let editId = Number(req.query.id);
    let  newData = studentData.map((item) =>{
      if(item.id === editId){
        item.name = req.body.name;
        item.email = req.body.email;
        item.number = req.body.number;
      }
      return item;
    });
    studentData = newData
    res.redirect("/forms");
    
});

app.listen(port,(error)=>{
    if(error){
        console.log("Something went wrong..");
    }
    console.log("server is running in port",port);
})