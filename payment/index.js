const express = require("express");
const app = express();
const ejs = require("ejs");
const userRoute = require("./routes/routes.payment");

app.use(express.json());
app.use("/payment", userRoute);

app.set("view engine","ejs");

const port = 9000;

app.listen(port, async (err)=>{
   if(err){
    console.log("something went wrong");
   }
   console.log("server in running at port",port);
})