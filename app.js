const { GoogleGenerativeAI } = require("@google/generative-ai");

const dotenv = require("dotenv");
dotenv.config();

const getData = async () => {
	// Make sure to include these imports:
	// import { GoogleGenerativeAI } from "@google/generative-ai";
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const prompt = "what is python.";

	const result = await model.generateContent(prompt);
	console.log(result.response.text());
};

getData();
