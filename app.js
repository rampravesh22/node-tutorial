const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/gemini", async (req, res) => {
	try {
		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

		const prompt = req.query.query;

		const result = await model.generateContent(prompt);
		res.json({ message: result.response.text(), test: "data" }).status(201);
	} catch (error) {
		res.json(error).status(400);
	}
});

app.listen(3000, () => {
	console.log("running on port 3000");
});
