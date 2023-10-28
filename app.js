const express = require("express");
const server = express();

server.use(express.json());
// end points routes

server.listen(8080, () => {
	console.log("server running...");
});
