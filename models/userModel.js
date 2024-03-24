const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		unique: true,
	},
	password: String,
	confirmPassword: String,
	profileImage: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
