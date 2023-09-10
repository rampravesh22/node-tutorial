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

exports.updateProduct = (req, res) => {
	const idParams = +req.params.id;
	const productIndex = products.findIndex((p) => p.id === idParams);
	products.splice(productIndex, 1, { ...req.body, id: idParams });

	res.status(201).send("product updated");
};

exports.partialUpdateProduct = (req, res) => {
	const id = req.params.id;
	const productIndex = products.findIndex((p) => p.id === id);
	const oldProduct = products[productIndex];
	products.splice(productIndex, 1, { ...oldProduct, ...req.body });
	res.send("patch updated");
};

exports.deleteProduct = (req, res) => {
	const id = req.params.id;
	const productIndex = products.findIndex((p) => p.id === id);
	products.splice(productIndex, 1);
	res.send("prdocut  deleted");
};
