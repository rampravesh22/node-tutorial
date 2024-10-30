import express from "express";
import {
	addTodo,
	deleteTodo,
	getTodos,
	updateTodo,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.post("/add", addTodo);

router.get("/get-all", getTodos);

router.delete("/delete/:id", deleteTodo);

router.put("/update/:id", updateTodo);

export default router;
