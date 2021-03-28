const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "hf92wq3hr7das5321fweg354y2f1#$#YT$B^@*2r1";

const register = async (req, res) => {
  const { username, email, password: plainTextPassword } = req.body;

  const saltPassword = await bcrypt.genSalt();
  const password = await bcrypt.hash(plainTextPassword, saltPassword);

  try {
    if (!username) {
      res.json({
        status: "error",
        error: "Username cannot be blank",
      });
    } else if (!email) {
      res.json({
        status: "error",
        error: "Email cannot be blank",
      });
    } else if (!plainTextPassword || plainTextPassword.length < 6) {
      res.json({
        status: "error",
        error:
          "Password is too short. Password shouls be at least 6 characters",
      });
    } else {
      const respone = await User.create({
        username,
        email,
        password,
      });
      if (respone) {
        res.json({ status: "ok", message: "User created successfully" });
      }
      console.log("User created successfully", respone);
    }
  } catch (err) {
    if (err.code === 11000) {
      res.json({
        status: "error",
        error: "Username or email already in use",
      });
    }
    return err;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.json({
      auth: false,
      status: "error",
      error: "User does not exist",
    });
  }

  try {
    await bcrypt.compare(password, user.password, (error, response) => {
      if (response) {
        const token = jwt.sign(
          { username: user.username, email: user.email },
          // {
          //   expiresIn: 500,
          // },
          JWT_SECRET
        );
        res.json({
          auth: true,
          token: token,
          result:
            "Token zostal stworzony i znaleziono usera o email i passwordu",
        });
      } else {
        res.json({
          auth: false,
          status: "error",
          error: "Invalid email/password",
        });
      }
    });
  } catch (error) {
    response.json({
      auth: false,
      message: "Not found",
    });
  }
};
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (token == null) {
    res.send("Token is needed");
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "You failed to authenticate",
        });
      } else {
        req.userID = decoded.id;
        decoded_token = jwt.decode(token);
        res.json({
          auth: true,
          message: "Authentication completed",
          user: decoded_token
        });
        next();
      }
    });
  }
};

const home = (req, res) => {
};

module.exports = { register, login, home, verifyToken };
