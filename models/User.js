const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  app: { type: String, required: true },
  username: { type: String, unique: true },
  name: { type: String },
  surname: { type: String },
  profile_image: { type: String },
  gender: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  birthdate: { type: Date },
  accept: { type: String },
  verify: { type: Boolean, default: false },
});
const User = new mongoose.model("User", UserSchema);
module.exports = User;
