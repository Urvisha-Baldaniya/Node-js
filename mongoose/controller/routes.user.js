const express = require("express");
const user = require("../model/model.user");

const userRoutes = express.Router();

// userRoutes.post("/addData",async (req, res)=>{
//    console.log(req.body);
//    let newUser = new user({
//     username : req.body.username,
//     email : req.body.email,
//     password : req.body.password
//    })

//    const saveUser = await newUser.save();
//    console.log(saveUser);
//    res.json({"userdata":saveUser})
// });

//get data

userRoutes.get("/getData",async (req, res)=>{
    const getData = await user.find();
    console.log(getData)
    res.send(getData);

})
//delete data

userRoutes.delete("/delete/:id", async (req, res)=>{
  const {id} = req.params;
  console.log(id);

  const deleteData = await user.findByIdAndDelete(id);
//   if(!deleteData){
//     res.json({msg : "data not found"})
//     console.log("data not found");
//   }
  console.log(deleteData);
});

//update data
userRoutes.patch("/update/:id", async (req, res)=>{
   const {id} = req.params;
   const {username, email, password} = req.body; 

   const updateData = await user.findByIdAndUpdate(id,{username, email, password});
   console.log(updateData);

});


module.exports = userRoutes;

