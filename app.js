const express = require("express");
const cors = require("cors");

const imageRouter = require("./routes/imageRoute");
require("./multer/multer");
require("./connection/conn");

const app = express();
app.use(cors());
app.use(express.json());
app.use("", imageRouter);
app.use(express.static("uploads"));

app.listen(3000, () => {
	console.log("running at port : 3000");
});
