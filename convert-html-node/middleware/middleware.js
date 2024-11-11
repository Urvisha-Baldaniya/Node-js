const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authToken = req.cookies.authToken;
        if (!authToken) {
            return res.redirect("/authentication-login.html");
        }
        jwt.verify(authToken, "node", (err, decoded) => {
            if (err) {
                res.status(403).json({ msg: "Unauthorized Access" });
            }
            req.user = decoded;
            next();
        })
    } catch (error) {
        console.log("User noy verified ", error);
    }
}

module.exports = verifyToken;