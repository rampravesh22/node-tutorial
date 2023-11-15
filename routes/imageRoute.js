const router = require("express").Router();
const Image = require("../models/imageModel");
const { upload } = require("../multer/multer");

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
		const image = await Image.findByIdAndDelete(req.params.id);
		res.json({ image, message: "deleted successfully" });
	} catch (error) {}
});

module.exports = router;
