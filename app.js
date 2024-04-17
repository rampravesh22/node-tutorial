const dotennv = require("dotenv");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
dotennv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
const products = require("./data/products");
// const seeder = require("./seeder");

//api
app.get("/api/products", (req, res) => {
	res.json(products);
});

app.get("/api/product/:id", (req, res) => {
	const product = products.find((product) => product._id === req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.json(`no data found with id ${req.params.id}`);
	}
});

app.listen(3000, () => {
	console.log(` Server running at ${process.env.PORT}.... `.bgCyan.black);
});
