const { mongoose } = require("mongoose");
const { Schema } = require("mongoose");
cons
const productShema = new Schema({
	title: { type: String, required: true, unique: true },
	description: String,
	price: {
		type: Number,
		min: [0, "wrong price"],
	},
	discountPercentage: {
		type: Number,
		min: [0, "wrong min rating"],
		max: [50, "wrong max rating"],
	},
	rating: {
		type: Number,
		min: [0, "wrong min rating"],
		max: [5, "wrong max rating"],
	},
	stock: Number,
	brand: { type: String, required: true },
	category: { type: String, required: true },
	thumbnail: { type: String, required: true },
	images: [String],
});

exports.Product = mongoose.model("Product", productShema);
