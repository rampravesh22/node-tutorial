const User = require("../models/userModel");

const { verifyToken } = require("../utils/authMiddleware");
const { generateToken } = require("../utils/jtwUtils");

const refreshToken = async (oldToken) => {
	try {
		const decodedToken = verifyToken(oldToken);
		console.log("decodedToken", decodedToken);
		const user = await User.findById(decodedToken.id);
		console.log(user);
		if (!user) {
			throw new Error("user not found");
		}
		const newToken = generateToken(user);
		return newToken;
	} catch (error) {
		throw new Error("Invalid token");
	}
};

module.exports = { refreshToken };
