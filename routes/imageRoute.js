const router = require("express").Router();
const Image = require("../models/imageModel");
const { upload } = require("../multer/multer");
const fs = require("fs");
const path = require("path");

router.post("/upload", upload.single("image-name"), async (req, res) => {
	try {
		const image = await Image.create({
			imagePath: req.file.filename,
		});
		res.json(image);
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

router.delete("/delete-image/:id", async (req, res) => {
	try {
		const image = await Image.findById(req.params.id);
		const filePath = path.join(__dirname, "../uploads/", image.imagePath);
		fs.unlink(filePath, async (error) => {
			try {
				const deletedImage = await Image.findByIdAndDelete(req.params.id);
				res.json({ deletedImage, message: "deleted successfully" });
			} catch (error) {
				res.json(error);
			}
		});
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
