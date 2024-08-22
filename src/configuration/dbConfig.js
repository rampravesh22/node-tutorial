const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	try {
		await mongoose.connect(`${process.env.MONGO_URL}/jwtapi`);
		console.log("mongodb connected successful");
	} catch (error) {
		console.log("error in connecting mongodb");
		process.exit(1);
	}
};
connectDB();
