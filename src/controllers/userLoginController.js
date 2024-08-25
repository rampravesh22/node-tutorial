const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jtwUtils");
const { login } = require("../services/loginService");

const userLoginController = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if the user exists
		const token = await login(email, password);
		res.json({ token: token });
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: "Invalid credentials" });
	}
};

module.exports = userLoginController;
