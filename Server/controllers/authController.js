import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";




const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    if (password.length < 10) {
      return res.status(400).json({ msg: "Password must be at least 10 characters" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ msg: "User registered successfully", user });
  } catch (error) {
    console.error(" Register error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// export const register = async (req, res) => {
//   try {
//     const { name, email, password,confirmPassword } = req.body;
//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashed,confirmPassword });
//     res.json({ msg: "User registered successfully", user });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ msg: "Error registering user", error: error.message });
//   }
//   if (!name || !email || !password || !confirmPassword) {
//     return res.status(400).json({ msg: "Please enter all fields" });
//   }
//   if (password.length < 10) {
//     return res
//       .status(400)
//       .json({ msg: "Password must be at least 10 characters" });
//   }

// };

//Login Controller
export const login = async (req, res) => {
  try {
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ msg: "Invalid credentials" });
    }


    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ msg: "Login successful", token });


  } catch (error) {    
    res.status(500).json({ msg: "Error logging in", error: error.message });  
  }
};

//Send OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await User.findOneAndUpdate({
    email
  }, {
    otp,
    otpExpires: Date.now() + 300000 // 5 minutes from now
  })
  
    res.json({ msg: "OTP sent successfully" });
  
}


//OTP Verification
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
  if (!user) {
    return res.status(400).json({ msg: "Invalid or expired OTP" });
  }
  res.json({ msg: "OTP verified successfully" });
}

//Reset Password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed, otp: null, otpExpires: null });
  res.json({ msg: "Password reset successfully" });
  
}

//authController.js

