const { refreshToken } = require("../services/refreshTokenService");

const userRefreshTokenController = async (req, res) => {
	try {
		const { token } = req.body;
		console.log(token);

		// Check if the user exists
		const newToken = await refreshToken(token);
		res.json({ newToken: newToken });
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: "Invalid credentials" });
	}
};

module.exports = userRefreshTokenController;
