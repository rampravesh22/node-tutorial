const express = require("express");
const { getUsersController } = require("../controllers/getUsersController");
const { authenticateToken } = require("../utils/authMiddleware");
const registerUserController = require("../controllers/userRegisterController");
const userLoginController = require("../controllers/userLoginController");
const userRefreshTokenController = require("../controllers/refreshTokenController");

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", userLoginController);
router.get("/getusers", authenticateToken, getUsersController);
router.post("/refresh-token", userRefreshTokenController);

module.exports = router;
