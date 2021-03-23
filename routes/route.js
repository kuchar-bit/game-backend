const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const BattleController = require("../controllers/BattleController");

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get("/isAuth", AuthController.verifyToken, AuthController.home);

router.get("/fight", BattleController.home);

module.exports = router;
