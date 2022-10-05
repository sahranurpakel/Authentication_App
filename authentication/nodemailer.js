const nodemailer = require("nodemailer");
const User = require("../models/User");

const emailFunc = (email, text, subject) => {
  console.log(email);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testdemosahra@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: "testdemosahra@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = { emailFunc };
