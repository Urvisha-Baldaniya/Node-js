const jwt = require("jsonwebtoken");

const verifyToken = (req, res,next) => {
   const token = req.cookies.authtoken;

   if(!token){
    res.status(403).json({msg : "No token provided, access denied"});
    res.redirect("/auth/loginPage");
   }
   
           
   jwt.verify(token, "node", (err, decoded)=> {
    if(err){
        return res.status(401).json({msg : "failed to authentication token"})
    }
    req.user = decoded;
    next();
   })
}

module.exports = verifyToken;