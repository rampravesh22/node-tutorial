const router = require("express").Router();
const Todo = require("../models/todoModel");
//add todo
router.post("/add-todo", async (req, res) => {
	const data = req.body;
	try {
		const singleTodo = await Todo.findOne(
			{ title: data.title },
			{ title: 1 }
		);
		if (Object.keys(singleTodo).length !== 0) {
			res.json({
				message: "todo with title already exists already exists",
				todo: singleTodo,
			});
		} else {
			await Todo.create(data);
			res.json({ message: "data added succefully" }).status(201);
		}
	} catch (error) {
		res.json(error);
	}
});
// get all todo
router.get("/todos", async (req, res) => {
	try {
		const todos = await Todo.find();
		res.json(todos);
	} catch (error) {
		res.json(error);
	}
});

// get one todo
router.get("/todo/:id", async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);
		res.json(todo).status(203);
	} catch (error) {
		res.json(error);
	}
});

// delete todo
router.delete("/delete/:id", async (req, res) => {
	try {
		const deleteTodo = Todo.findByIdAndDelete(req.params.id);
		res.json({ todo: deleteTodo, message: "Todo deleted successfully" });
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
