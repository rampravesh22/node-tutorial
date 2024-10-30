import User from "../models/userModal.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.json({ message: "User already exists", success: false })
				.status(400);
		}
		const hashedpassword = await bcrypt.hash(password, 12);

		const newUser = new User({ name, email, password: hashedpassword });
		await newUser.save();
		res
			.json({ message: "User created successfully", success: true })
			.status(201);
	} catch (error) {
		res.json({ error: error }).status(500);
	}
};

export const loginUser = async (req, res) => {
	const { email, password: password1 } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.json({ message: "User not found.", success: false })
				.status(400);
		}

		const isPasswordCorrect = await bcrypt.compare(password1, user.password);
		if (!isPasswordCorrect) {
			return res
				.json({ message: "Inavalid credentials.", success: false })
				.status(400);
		}

		const token = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.SECRET_KEY
		);

		res
			.json({
				message: "Login successful",
				success: true,
				token,
				user: { id: user._id, name: user.name, email: user.email },
			})
			.status(200);
	} catch (error) {
		res.json({ message: "Something went wrong.", error }).status(500);
	}
};
