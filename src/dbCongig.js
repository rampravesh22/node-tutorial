const mongoose = require("mongoose");
console.log("mongoconfig");
const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.jwt_mern);
		console.log("mongodb connected succesfully");
	} catch (error) {
		console.log("error in connecting mongodb");
		process.exit(1);
	}
};
connectMongoDB();
