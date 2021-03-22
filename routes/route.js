const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get("/isAuth", AuthController.verifyToken, AuthController.users);

module.exports = router;
