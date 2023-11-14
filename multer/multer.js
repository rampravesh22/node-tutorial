const path = require("path");
const multer = require("multer");
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
module.exports.upload = multer({
	storage: storage,
});
