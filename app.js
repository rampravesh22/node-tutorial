const mongoose = require("mongoose");
const router = require("express").Router();
const colors = require("colors");

const studentSchema = mongoose.Schema({
	name: String,
	age: Number,
});

const Student = mongoose.model("Student", studentSchema);

router.post("/add-student", async (req, res) => {
	try {
		await Student.create(req.body);
		console.log("testing for js".bgYellow);
	} catch (error) {
		res.send(error);
	}
});
