const { login } = require("../services/loginService");

const userLoginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(email, password);
		// Check if the user exists
		const token = await login(email, password);
		res.json({ token: token });
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: "Invalid credentials" });
	}
};

module.exports = userLoginController;
