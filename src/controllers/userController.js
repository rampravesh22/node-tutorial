const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jtwUtils");
const registerUserController = async (req, res) => {
	try {
		const userData = req.body;
		const { name, email, password } = userData;

		const user = await User.findOne({ email: email });

		if (user) {
			res
				.send({ message: `user with email ${user.email} already exists` })
				.status(400);
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const createdUser = new User({
				name,
				email,
				password: hashedPassword,
				role: "customer",
			});

			const savedUser = await createdUser.save();
			res
				.status(201)
				.json({ user: savedUser, message: "User created successful" });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ errorMessage: error.message });
	}
};

// Controller for user login
const userLoginController = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if the user exists
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(400).json({ message: "User not found" });
		}

		// Validate the password
		const isPasswordValid = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordValid) {
			return res.status(400).json({ message: "Incorrect password" });
		}

		// Generate a token

		const token = generateToken(existingUser);
		res
			.status(200)
			.json({
				token,
				message: "User logged in successfully",
				name: existingUser.name,
			});
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Invalid credentials" });
	}
};

const allUsersControllers = async (req, res) => {
	try {
		const allUsers = await User.find();
		res.send({ users: allUsers }).status(200);
	} catch (error) {
		res.send({ error }).status(400);
	}
};

module.exports = {
	registerUserController,
	allUsersControllers,
	userLoginController,
};
