User = require("../models/User");
module.exports.registerValidation = (reqbody) => {
  const errors = [];
  email = reqbody.email;
  User.findOne({ email })
    .lean()
    .then((user) => {
      if (user) {
        errors.push({ message: "Email already in use" });
      }
    });
  if (reqbody.username === "") {
    errors.push({ message: "Please fill the username area" });
  }
  if (reqbody.name === "") {
    errors.push({ message: "Please fill the name area" });
  }
  if (reqbody.surname === "") {
    errors.push({ message: "Please fill the surname area" });
  }
  if (reqbody.email === "") {
    errors.push({ message: "Please fill the email area" });
  }
  if (reqbody.birthdate === "") {
    errors.push({ message: "Please fill the birthdate area" });
  }
  if (reqbody.image === "") {
    errors.push({ message: "Please fill the image area" });
  }
  if (reqbody.password === "") {
    errors.push({ message: "Please fill the password area" });
  }
  if (reqbody.gender === "") {
    errors.push({ message: "Please select gender" });
  }
  if (reqbody.accept === false) {
    errors.push({ message: "Please select accept button" });
  }
  return errors;
};
