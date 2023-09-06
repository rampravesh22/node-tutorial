const express = require("express");
const userController = require("../controller/user");
const router = express.Router();
router
	.post("/", userController.createUser)
	.get("/", userController.getAllUser)
	.get("/:id", userController.getUser)
	.put("/:id", userController.updateUser)
	.patch("/:id", userController.partialUpdaeUser)
	.delete("/:id", userController.deleteUser);

exports.routes = router;
