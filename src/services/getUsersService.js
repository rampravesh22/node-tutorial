const User = require("../models/userModel");

const getUsers = async () => {
	const users = await User.find();
	return users;
};

module.exports = { getUsers };
