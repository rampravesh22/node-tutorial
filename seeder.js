const mongoose = require("mongoose");
const dotennv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products.js");
const User = require("./models/userModel");
const Product = require("./models/productModel.js");
const Order = require("./models/orderModel");
const connectDB = require("/config/db.js");
dotennv.config();

const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();
		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});
		await Product.insertMany(sampleProducts);
		console.log("Data inserted".green.inverse);
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const destoryData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();
		console.log("data destroyed".red.inverse);
		process.exit();
	} catch (error) {
		process.exit(1);
	}
};

module.exports = { destoryData, importData };
