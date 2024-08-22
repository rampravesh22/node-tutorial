const express = require("express");
const {
	registerUserController,
	allUsersControllers,
	userLoginController,
} = require("../controllers/userController");
const { authenticateToken } = require("../utils/authMiddleware");

const router = express.Router();

router.post("/register", registerUserController);
router.get("/allusers", authenticateToken, allUsersControllers);
router.post("/login", userLoginController);

module.exports = router;
