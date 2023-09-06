const express = require("express");
const fs = require("fs");
const server = express();
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;
server.use(express.json());

// end points, routes, base URL, CRUD
server.post("/products", (req, res) => {
	const product = req.body;
	const findProduct = products.find((p) => p.id === product.id);
	if (findProduct) {
		res.send(`${product.id} id product is already exists`);
		return;
	} else {
		products.push(product);
		res.send("product added");
	}
});

//Read GET /products
server.get("/products", (req, res) => {
	res.send(products);
});

// Read GET /products/32
server.get("/products/:id", (req, res) => {
	const id = +req.params.id;
	const product = products.find((p) => p.id === id);
	res.send(product);
});

// UPDATE PUT /product/id
server.put("/products/:id", (req, res) => {
	const idParams = +req.params.id;
	const productIndex = products.findIndex((p) => p.id === idParams);
	products.splice(productIndex, 1, { ...req.body, id: idParams });

	res.status(201).send("product updated");
});

//Partial update patch product/id
server.patch("/products/:id", (req, res) => {
	const id = req.params.id;
	const productIndex = products.findIndex((p) => p.id === id);
	const oldProduct = products[productIndex];
	products.splice(productIndex, 1, { ...oldProduct, ...req.body });
	res.send("patch updated");
});
server.delete("/", (req, res) => {
	const id = req.params.id;
	const productIndex = products.findIndex((p) => p.id === id);
	const oldProduct = products[productIndex];
	products.splice(productIndex, 1);
	res.send("patch updated");
});

server.listen(8080, () => {
	console.log("server running...");
});
