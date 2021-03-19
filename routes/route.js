const express = require("express");
const router = express.Router();
const registerTemplateCopy = require("../models/RegisterModels");
const bcrypt = require("bcrypt")

router.post("/register",async (req, res) => {

  const saltPassword = await bcrypt.genSalt(10)
  const securePassword = await bcrypt.hash(req.body.password, saltPassword)

  const signUpUser = new registerTemplateCopy({
    username: req.body.username,
    email: req.body.email,
    password: securePassword,
  });

  signUpUser.save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
