import Todo from "../models/todoModal.js";

export const addTodo = async (req, res) => {
	const userId = req.user.id;
	const title = req.body.title;
	try {
		const todo = new Todo({ title, userId });
		await todo.save();
		res.json({ message: "Todo added successful", todo }).status(201);
	} catch (error) {
		res.json({ error }).status(500);
	}
};

export const updateTodo = async (req, res) => {
	const id = req.params.id;
	const completed = req.body.completed;
	try {
		const todo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
		res.json(todo).status(200);
	} catch (error) {
		res.json(error).status(500);
	}
};

export const getTodos = async (req, res) => {
	const userId = req.user.id;

	try {
		const todos = await Todo.find({ userId }).sort({ updatedAt: -1 });
		res.json(todos).status(200);
	} catch (error) {
		res.json(error).status(500);
	}
};

export const deleteTodo = async (req, res) => {
	const id = req.params.id;
	try {
		await Todo.findByIdAndDelete(id);
		res.json({ message: "Todo deleted successful" }).status(200);
	} catch (error) {
		res.json(error).status(500);
	}
};
