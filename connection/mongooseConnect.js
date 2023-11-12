const mongoose = require("mongoose");
const connect = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://rpc7863:toofanram@cluster0.6twkgrp.mongodb.net/crud"
		);

		console.log("mongodb connected");
	} catch (error) {
		console.log(error);
	}
};

connect();
