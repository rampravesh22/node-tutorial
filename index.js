const mongoose = require("mongoose");
const express = require("express");
const server = express();
server.use(express.json());

const main = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/test");
	} catch (error) {
		console.log(error);
	}

	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};
main();
//-----------------------------------------------------//
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
server.use("/products", productRouter.routes);
server.use("/users", userRouter.routes);
// end points, routes, base URL, CRUD

server.listen(8080, () => {
	console.log("server running...");
});
