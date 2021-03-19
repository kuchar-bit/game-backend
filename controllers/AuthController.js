const registerTemplateCopy = require("../models/User");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "hf92wq3hr7das5321fweg354y2f1#$#YT$B^@*2r1";

const register = async (req, res) => {
  const saltPassword = await bcrypt.genSalt();
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);

  const signUpUser = new registerTemplateCopy({
    username: req.body.username,
    email: req.body.email,
    password: securePassword,
  });

  signUpUser
    .save()
    .then((data) => {
      res.json({
        message: "User added successfully",
      });
    })
    .catch((error) => {
      res.json(error);
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ status: "error", error: "Invalid email/password" });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      // the username, password combination is successful

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

      return res.json({ status: "ok", data: token });
    } else {
      return res.json({
        message: "Not allowed",
      });
    }
  } catch {
    return res.json({
      message: "Cannot found",
    });
  }
};

module.exports = { register, login };
