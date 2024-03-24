const mongoose = require("mongoose");

const mongodbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log(" mongodb connected ".bgGreen.black);
	} catch (error) {
		console.log(error);
	}
};

mongodbConnect();
