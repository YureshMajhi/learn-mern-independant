const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// signup statics
userSchema.statics.signup = async function (email, password) {
  // validator
  if (!email || !password) {
    throw Error("All feilds must are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // check email
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  // validator
  if (!email || !password) {
    throw Error("All feilds must are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
