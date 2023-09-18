const express = require("express");
const server = express();
server.use(express.json());
//-----------------------------
const model = require("../models/product");
const Product = model.Product;
exports.createProduct = async (req, res) => {
	try {
		const product = new Product(req.body);
		product.title = "new phone";
		await product.save();
		res.send("data added");
	} catch (error) {
		res.send(error);
	}
};

exports.getAllProducts = async (req, res) => {
	const products = await Product.find();
	res.send(products);
};

exports.getProduct = async (req, res) => {
	const id = +req.params.id;
	const product = await Product.findById(id);
	res.send(product);
};

exports.updateProduct = async (req, res) => {
	const id = req.params.id;
	try {
		const doc = await Product.findOneAndReplace({ _id: id }, req.body);
	} catch (error) {
		console.log(error);
	}
	res.send(doc);
};

exports.partialUpdateProduct = async (req, res) => {
	const id = req.params.id;
	try {
		const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
			new: true,
		});
		res.send(doc);
	} catch (error) {
		res.send(express.json(error));
	}
};

exports.deleteProduct = async (req, res) => {
	const id = req.params.id;
	try {
		const doc = await Product.findOneAndDelete({ _id: id });
		res.send(doc);
	} catch (error) {
		res.send(express.json(error));
	}
};
