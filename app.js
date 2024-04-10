const dotennv = require("dotenv");
dotennv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

app.listen(3000, () => {
	console.log("running at 3000....");
});
