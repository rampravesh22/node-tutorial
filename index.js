const express = require("express");
const server = express();
server.use(express.json());
//-----------------------------------------------------//
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
server.use("/products", productRouter.routes);
server.use("/users", userRouter.routes);
// end points, routes, base URL, CRUD

server.listen(8080, () => {
	console.log("server running...");
});
