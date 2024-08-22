const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createAdminAccount = async () => {
	try {
		const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

		if (!existingAdmin) {
			const newAdmin = new User({
				email: "admin@gmail.com",
				name: "admin",
				password: await bcrypt.hash("admin", 10),
				role: "admin",
			});
			await newAdmin.save();
			console.log("admin account created successful");
		} else {
			console.log("Admin already exist");
		}
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = createAdminAccount;
