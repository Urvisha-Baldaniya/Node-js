const express = require("express");
const app = express();
const {connection} = require("./connection/db");
const userRoutes = require("./controller/routes.user");

app.use(express.json());
app.use("/users",userRoutes);

const port = 43000;
app.get("/",(req, res)=>{
    res.end("hello world");
})

app.listen(port,async(req, res, err)=>{
    await connection;
    // if(err){
    //     console.log("something went wrong");
    //     return
    // }
    console.log("server is in running at port",port);
})