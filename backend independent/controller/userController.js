const User = require("../model/userModel");

//login
const login = async (req, res) => {
  res.status(200).json({ msg: "user login" });
};

//signup
const signup = async (req, res) => {
  res.status(200).json({ msg: "user signup" });
};

module.exports = { login, signup };
