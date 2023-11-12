const express = require("express");
const app = express();
require("./connection/mongooseConnect");
app.use(express.json());

const todoRouter = require("./routes/todoRouter");
app.use("/api", todoRouter);
app.listen(3000, () => {
	console.log(`server running at 3000`);
});
