const express = require("express");
const app = express();
const connection = require("./connection/db");
const authRoute = require("./routes/routes.auth");
const postRoute = require("./routes/routes.post");

app.use(express.json());
app.use("/auth", authRoute);
app.use("/post", postRoute);

const port = 33000;

app.listen(port, async (err)=>{
    await connection;
   err?console.log("something went wrong"):console.log("server in running at port",port);
});