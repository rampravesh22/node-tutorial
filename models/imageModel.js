const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
	imagePath: String,
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
