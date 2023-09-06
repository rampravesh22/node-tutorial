const express = require("express");
const morgan = require("morgan");
const server = express();

server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));

// end points routes
server.get("/product/:id", auth, (req, res) => {
	res.send(req.body);
});
server.post("/products", auth, (req, res) => {
	res.send("post completed");
});
server.put("/delete-products/:id", auth, (req, res) => {
	res.send("put");
});
server.delete("/", auth, (req, res) => {
	res.send("delete");
});
server.patch("/", auth, (req, res) => {
	res.send("patch");
});

server.listen(8080, () => {
	console.log("server running...");
});
