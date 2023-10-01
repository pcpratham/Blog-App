const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const user = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const errorHandler = require("../Middlewares/errorMiddleware");
const authTokenHandler = require("../Middlewares/checkAuthToken");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pcpratham02@gmail.com",
    pass: `${process.env.PASS}`,
  },
});

router.get("/test", async (req, res) => {
  res.json({
    message: "Auth Api is working!!",
  });
});

router.post("/sendotp", async (req, res, next) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const mailOptions = {
      from: process.env.COMPANY_MAIL,
      to: email,
      subject: "OTP verification for Blog-APP",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: err.message,
        });
      } else {
        res.json({
          message: "Otp send successfully",
          otp: otp,
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await user.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    const newUser = await user.create({
      name: name,
      email: email,
      password: secPass,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    const existingUser = await user.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const authToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );
    const refreshToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("authToken", authToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (err) {
    next(err);
  }
});

// router.post('/register',async (req,res) => {
//     try{
//         const {name,email,password} = req.body;
//         const existingUser = await user.find({ email: email});
//         if(!existingUser){
//             return res.status(409).json({message:"User already registered"});
//         }
//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(password,salt);
//         const newUser = await user.create({
//             name:name,
//             email:email,
//             password:secPass
//         })
//         res.status(201).json({
//             success: true,
//             message:"User registered successfully",
//             data:newUser
//         });
//     }
//     catch(err){
//         res.status(500).json({
//             message:err.message
//         })
//     }
// })
router.use(errorHandler);

router.get("/checklogin", authTokenHandler, async (req, res) => {
  res.json({
    success: true,
    message: "User authenticated successfully",
  });
});
module.exports = router;
