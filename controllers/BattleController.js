const jwt = require("jsonwebtoken");

const home = (req, res) => {
  const token = req.headers["x-access-token"];

  if (!username) {
    res.json({
      status: "error",
      error: "Username cannot be blank",
    });
  } else {
    decoded_token = jwt.decode(token);
    res.json({
      user: decoded_token,
    });
  }

  res.send("Server is running !!!");
};

module.exports = { home };
