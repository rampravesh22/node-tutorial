const mongoose = require("mongoose");
const dotennv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const products = rquire("./data/products.js");
const User = require("./models/userModel");
const Product = rquire("./models/productModel.js");
const Order = require("./models/orderModel");
const connectDB = rquire("/config/db.js");
dotennv.config();

const importData = async () => {
	try {
		await Order.deleteMay();
		await Order;
	} catch (error) {}
};
