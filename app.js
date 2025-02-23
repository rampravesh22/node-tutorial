import connectDB from "./config/dbConfig.js";
import express from "express";
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoutes.js";
import cors from "cors";
import verifyToken from "./middleware/authMiddleware.js";
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/user", userRouter);
app.use("/todo", verifyToken, todoRouter);

app.listen(3000, () => {
	console.log("Server running on 3000");
});
