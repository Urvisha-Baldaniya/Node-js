const express = require("express");
const app = express();
const ejs = require("ejs");
const connection = require("./connection/db");
app.use(express.json());
const bcrypt = require("bcrypt");
const user = require("./model/model.reg");
const authRoute = require("./routes/routes.auth");
const pagesRoutes = require("./pages/home");

app.use("/auth", authRoute);
app.use("/",pagesRoutes);
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const port = 9000;


// app.get("/register", async (req, res) => {
//     let allData = await user.find();
//     console.log(allData);
//     res.render("reg",
//         { userData: allData }
//     );
// })

app.listen(port, async () => {
    await connection;
    console.log("server in running at port", port);
})