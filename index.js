const express = require("express");
const fs = require("fs");
const server = express();
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;
server.use(express.json());

// end points routes
server.get("/product/:id", (req, res) => {
	res.send(req.body);
});
server.post("/products", (req, res) => {
	res.send("post completed");
});
server.put("/delete-products/:id", (req, res) => {
	res.send("put");
});
server.delete("/", (req, res) => {
	res.send("delete");
});
server.patch("/", (req, res) => {
	res.send("patch");
});

server.listen(8080, () => {
	console.log("server running...");
});
