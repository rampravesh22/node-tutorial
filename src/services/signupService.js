const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
	const { name, email, password } = userData;
	const hashedPassword = bcrypt.hash(password, 10);
	const user = new User({ name, email, hashedPassword, role: "customer" });

	const savedUser = await user.save();
	return savedUser;
};

module.exports = { createUser };
