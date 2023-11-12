const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	dateAdded: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Todo", todoSchema);
