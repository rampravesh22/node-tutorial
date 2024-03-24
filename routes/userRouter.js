const router = require("express").Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
	try {
		const { email } = req.body;
		const findEmail = await User.findOne({ email });

		if (findEmail) {
			res.json({ created: false, message: "email already exists" });
		} else {
			const user = await User(req.body);
			await user.save();
			res.json({ created: true, message: "user registration success" });
		}
	} catch (error) {
		res.json(error);
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email: email });
		const { password, ...userData } = user._doc;
		if (user) {
			res.json({ message: "Login success", success: true, userData });
		} else {
			res.json({ message: "You are not registered", success: false });
		}
	} catch (error) {
		res.json(error);
		console.log(error);
	}
});
module.exports = router;
