const router = require("express").Router();
const Image = require("../models/imageModel");
const { upload } = require("../multer/multer");

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

module.exports = router;
