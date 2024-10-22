import express from "express";
import { connectDB } from "./config/dbConfig.js";
import cors from "cors";

import blogRoutes from "./routes/blogRoutes.js";

const app = express();
connectDB();
app.use(cors());

app.use(express.json());
app.use("/api/blog", blogRoutes);

app.listen(3000, () => {
	console.log("Server running at port 3000");
});

console.log(Math.min(1, 2, 3, 4, 5));
