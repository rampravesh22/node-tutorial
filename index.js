const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("colors");
require("./connection/mongoConnect");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

const PORT = process.env.PORT || 3000;

// router
const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);

app.listen(PORT, () => {
	console.log("server is runing : http://localhost:3000");
});
