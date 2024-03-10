const nodemailer = require("nodemailer");
const otpgenerator = require('otp-generator');
require('dotenv').config(); // For loading environment variables from .env file
let OTP;  
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME, // Use environment variables for security
      pass: process.env.EMAIL_PASSWORD,
    }
  });

exports.sendotp=(req,res,next)=>{
    OTP=otpgenerator.generate(4, { digits: true, upperCaseAlphabets:false,lowerCaseAlphabets:false, specialChars: false });
    console.log(OTP)
    console.log(req.body);
    // Prepare the email message
    const message = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME, // Replace with the recipient's email address
      subject: "Your OTP for Login in WhatsApp.",
      text: `Your OTP for login is: ${OTP}`,
      html: `<p>Your OTP for login is:<h3><strong>${OTP}</strong></h3></p>`,
    };
  
    //  transporter.sendMail(message, (err, info) => {
    //    if (err) {
    //      console.log("OTP sent error: " + err);
    //      res.status(500).send("Error sending OTP");
    //    } else {
    //      console.log("OTP sent successfully");
    //      res.status(200).send("OTP sent successfully");
    //  }
    //  });

    res.status(200).send("OTP sent successfully");

}

exports.verfyotp=(req,res,next)=>{
    
   console.log(req.body.otp);
   if (req.body.otp === OTP) {
    console.log("Verify");
    next();
   // res.json({ success: true });
} else {
    // Handle case when OTP does not match
    res.status(400).json({message:"Invalid OTP"});
}

}

