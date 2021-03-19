const express = require("express");
const router = express.Router();
const registerTemplateCopy = require("../models/RegisterModels");

router.post("/register", (req, res) => {
  const signUpUser = new registerTemplateCopy({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
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
