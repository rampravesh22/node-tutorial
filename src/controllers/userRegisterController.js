const { createUser } = require("../services/signupService");
const User = require("../models/userModel");

const registerUserController = async (req, res) => {
	try {
		const userData = req.body;

		const user = await User.findOne({ email: userData.email });

		if (user) {
			res
				.send({ message: `user with email ${user.email} already exists` })
				.status(400);
		} else {
			const createdUser = await createUser(userData);

			res
				.status(201)
				.json({ user: createdUser, message: "User created successful" });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ errorMessage: error.message });
	}
};

module.exports = registerUserController;
