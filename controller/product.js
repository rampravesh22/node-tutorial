const express = require("express");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;
const server = express();
server.use(express.json());
//-----------------------------

exports.createProduct = (req, res) => {
	const product = req.body;
	const findProduct = products.find((p) => p.id === product.id);
	if (findProduct) {
		res.send(`${product.id} id product is already exists`);
		return;
	} else {
		products.push(product);
		res.send("product added");
	}
};

exports.getAllProducts = (req, res) => {
	res.send(products);
};

exports.getProduct = (req, res) => {
	const id = +req.params.id;
	const product = products.find((p) => p.id === id);
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
