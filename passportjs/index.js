 const express = require("express");
const app = express();
const ejs = require("ejs");
const passport = require("passport");
const session = require("express-session");
const connection = require("./connection/db");
const authRoute = require("./routes/routes.auth");

const auth = require("./model/model.auth");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine","ejs");

const port = 8000;

const LocalStrategy = require("passport-local");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
    
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  async(username, password, done) => {
      console.log(username, password, "from localstratergy");
      try{
        const user = await auth.findOne({username});
        if(!user){
          return done(null, false, {message: "incorrect user"})
        }
        if(user.password !== password){
          return done(null, false, {message: "incorrect password"})
        }
        
        return done(null, user)
      }
      catch(error){
        return done(err)
      }
    }
  ));
  
  //serlize => store the user into session
  //deserlize => to get the data from session //like local storage.getItem
  
  passport.serializeUser((user, done)=>{
    done(null, user.id)
  })
  passport.deserializeUser(async(id, done) =>{
    try{
      const user = await auth.findOne({id})
      done(null, user)
    }catch(error){
      done(null, false)
    }
  })
  
  app.use("/auth", authRoute);
app.listen(port, async ()=>{
    await connection;
    console.log("db is connected");
    console.log("server in running at port",port);
})
