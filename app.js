const express = require("express");
const cors = require("cors");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const Image = require("./models/imageModel");
require("./connection/conn");

const app = express();
app.use(cors());
app.use(express.json());
app.use("", router);
app.use(express.static("uploads"));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.originalname + "_" + Date.now() + path.extname(file.originalname)
		);
	},
});
const upload = multer({
	storage: storage,
});

router.post("/upload", upload.single("image-name"), async (req, res) => {
	try {
		Image.create({
			imagePath: req.file.filename,
		});
		res.json("uploded successfuly");
	} catch (error) {
		res.json(error);
	}
});

router.get("/images", async (req, res) => {
	try {
		const images = await Image.find();
		res.json(images);
	} catch (error) {
		res.json(error);
	}
});

app.listen(3000, () => {
	console.log("running at port : 3000");
});
