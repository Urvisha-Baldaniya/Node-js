const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const auth = require("../model/model.auth");
const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "please all the feild required" });
    }

    const hashedPass = await bcrypt.hash(password, 5);
    const newUser = new auth({ username, email, password: hashedPass });
    await newUser.save();
    console.log(newUser)
    res.status(200).json({ msg: "user added successfully", newUser });

  } catch (error) {
    res.status(400).json({ msg: "server error", error: error.message })
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await auth.findOne({ email });
    console.log(user);

    if (!user) {
      res.status(400).json({ msg: "wrong credentioal" });
    }
    else {
      const matchedpass = await bcrypt.compare(password, user.password);
      if (matchedpass) {
        let token = jwt.sign({ course: "node" }, "node", { expiresIn: '1h' });
        console.log(token, "token");

        res.cookie("authtoken", token);
        res.status(200).json({ msg: "Login Successfully", token });
      }
      else {
        res.status(400).json({ msg: "wrong credentioal" })
      }
    }
  } catch (error) {
    res.status(400).json({ msg: "server error", error: error.message })
  }
});

authRoutes.get("/registerPage", (req, res) => {
  res.render("signup");
})

authRoutes.get("/loginPage", (req, res) => {
  res.render("login");
})

authRoutes.get("/updatePass", (req, res) => {
  res.render("update");
})

authRoutes.get("/verify", (req, res) => {
  res.render("verifyOTP");
})
authRoutes.get("/generatotp", (req, res) => {
  res.render("generateOTP");
})

authRoutes.post("/changePass", async (req, res) => {
  try {
    console.log(req.body);
    const { email, oldPass, newPass } = req.body;

    if (!email || !oldPass || !newPass) {
      res.status(400).json({ msg: "All fileds Are required..." });
    }

    const user = await auth.findOne({ email });
    console.log(user);
    if (user) {
      const passwordMatch = await bcrypt.compare(oldPass, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Old Password is incorrect' });
      }
      const hashedNewPassword = await bcrypt.hash(newPass, 5);
      user.password = hashedNewPassword;
      await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
    }
    else {
      return res.status(400).json({ message: 'User not found' });
    }
  }
  catch (error) {
    console.log("Password Not Changed");
  }
})

authRoutes.get("/generateOtp", (req, res) => {
  res.render("generateOtp");
})

authRoutes.post("/generateOtp", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      res.status(400).json({ msg: "Email is required ! " });
    }
    const user = await auth.findOne({ email });

    if (!user) {
      res.status(404).json({ msg: 'User not found, invalid email' })
    }

    console.log("otp generated")
    res.status(200).json({ success: true, msg: "Opt send successfully" });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        user: "urvishabaldaniya12@gmail.com",
        pass: "cgkc iqmt hjok xbqb",
      },
    });

    let randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    let otpExpires = Date.now() + 60 * 10 * 1000;

    console.log(randomOtp)

    user.otp = randomOtp;
    user.otpExpires = otpExpires;
    await user.save(); // store the otp in data bse

    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: user.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: randomOtp, // plain text body
      });

      console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);

  } catch (error) {
    res.status(400).json({ msg: "Otp not sent something is wrong", error })
  }
})

authRoutes.post('/verifyOTP', async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;
    console.log(email, otp, newpassword)
    if (!email || !otp || !newpassword) {
      res.status(400).json({ msg: "All fileds are required" });
    }
    const user = await auth.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'User Not Found...' });
    }
    const hashedNewPassword = await bcrypt.hash(newpassword, 5);
    user.password = hashedNewPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ success: true, msg: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(500).json({ msg: 'Error resetting password', error });
  }
});

module.exports = authRoutes;