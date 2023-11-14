const mongoose = require("mongoose");
require("dotenv").config();
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("mongodb connected");
	} catch (error) {
		console.log(error);
	}
};
connect();
