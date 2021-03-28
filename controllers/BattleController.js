const jwt = require("jsonwebtoken");

const home = (req, res) => {
  const token = req.headers["x-access-token"];

  const user = {
      
  }

  res.send("Server is running!!!")
};

module.exports = { home };
