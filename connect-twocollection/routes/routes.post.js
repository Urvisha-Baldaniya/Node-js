const express = require("express");

const post = require("../model/model.post");
const postRoutes = express.Router();

postRoutes.post("/add", async (req, res)=>{
    try{
     console.log(req.body);
     const {title, content, author}= req.body;
     

     const newpost = new post({title, content, author});
     await newpost.save();
     res.json({msg : "post added..!", post : newpost})
    }catch(error){
        console.log(error);
        res.status(500).json({ msg: "Error adding post", error });
    }
});

postRoutes.get("/getdata", (req, res)=>{
    try{
     const posts = new post.find().populate('author');
     res.json({ msg: "Posts retrieved", posts });

    }catch(error){
        console.log(error);
        res.status(500).json({ msg: "Error retrieving posts", error });
    }
})

module.exports = postRoutes;