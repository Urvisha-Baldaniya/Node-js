const express = require("express");
const app = express();

const path = require("path");

const ejs = require("ejs");

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'views'));

const session = require("express-session");

const cookieparser = require("cookie-parser");

const connection = require("./connection/db");

const productRoute = require("./routes/routes.product");

const authRoute = require("./routes/routes.auth");

const port = 9090;

app.use(express.json());
app.use(cookieparser());

app.use(session({
  secret: 'your-secret-key',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 30000 }
}));

app.use("/products", productRoute);

app.use("/auth", authRoute);

app.listen(port, async () => {
  try {
    await connection;

    console.log("server in running at port", port);
  }
  catch (error) {
    console.log("something went wrong", error);
  }
});
