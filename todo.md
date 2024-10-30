Creating a full-fledged **MERN** (MongoDB, Express, React, Node.js) stack to-do application with authentication is a great project. I'll break it down into two main parts:

1. **Backend (Node.js + Express + MongoDB)**: This will handle authentication (using JWT) and API endpoints for creating, reading, updating, and deleting (CRUD) to-do items.
2. **Frontend (React)**: This will handle user interface interactions, user login/signup, and to-do management.

Below is a full working example that includes all the steps.

---

## Part 1: Backend (Node.js + Express + MongoDB)

### Setup

1. **Initialize the Project**:

```bash
mkdir mern-todo-app
cd mern-todo-app
npm init -y
```

2. **Install Dependencies**:

```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv cors
npm install --save-dev nodemon
```

3. **Backend Structure**:
   Create the following folder structure:

```
/backend
  /models
  /routes
  /controllers
  server.js
```

### **server.js (Main Entry Point)**

```javascript
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB...", err));

// Routes
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

app.use("/api/auth", userRoutes);
app.use("/api/todos", todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### **User Model (models/User.js)**

This will store user information like name, email, password (hashed).

```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
```

### **Todo Model (models/Todo.js)**

This will store each user's to-do items.

```javascript
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", TodoSchema);
```

### **User Routes and Controller (routes/userRoutes.js)**

Handles user registration and login.

```javascript
const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

module.exports = router;
```

### **User Controller (controllers/userController.js)**

Handles user registration, login, and JWT token generation.

```javascript
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = new User({ name, email, password: hashedPassword });

		await newUser.save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

// Login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "User not found" });

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid credentials" });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({
			token,
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = { registerUser, loginUser };
```

### **Todo Routes and Controller (routes/todoRoutes.js)**

Handles CRUD operations for to-do items.

```javascript
const express = require("express");
const {
	addTodo,
	getTodos,
	deleteTodo,
	updateTodo,
} = require("../controllers/todoController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// Add new todo
router.post("/", verifyToken, addTodo);

// Get all todos for a user
router.get("/", verifyToken, getTodos);

// Delete a todo
router.delete("/:id", verifyToken, deleteTodo);

// Update a todo
router.put("/:id", verifyToken, updateTodo);

module.exports = router;
```

### **Todo Controller (controllers/todoController.js)**

CRUD functions for to-do items.

```javascript
const Todo = require("../models/Todo");

// Add a new to-do
const addTodo = async (req, res) => {
	const { title } = req.body;
	const userId = req.user.id;

	try {
		const newTodo = new Todo({
			userId,
			title,
		});

		await newTodo.save();
		res.status(201).json(newTodo);
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

// Get all todos for the user
const getTodos = async (req, res) => {
	const userId = req.user.id;

	try {
		const todos = await Todo.find({ userId });
		res.status(200).json(todos);
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

// Delete a todo
const deleteTodo = async (req, res) => {
	const { id } = req.params;

	try {
		await Todo.findByIdAndDelete(id);
		res.status(200).json({ message: "Todo deleted" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

// Update a todo
const updateTodo = async (req, res) => {
	const { id } = req.params;
	const { completed } = req.body;

	try {
		const updatedTodo = await Todo.findByIdAndUpdate(
			id,
			{ completed },
			{ new: true }
		);
		res.status(200).json(updatedTodo);
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = { addTodo, getTodos, deleteTodo, updateTodo };
```

### **JWT Authentication Middleware (middleware/authMiddleware.js)**

Verifies the JWT token for protected routes.

```javascript
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];

	if (!token) return res.status(401).json({ message: "No token provided" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid token" });
	}
};

module.exports = verifyToken;
```

### **Environment Variables (.env)**

Create a `.env` file in the root of the `backend` folder:

```
MONGO_URL=mongodb://localhost:27017/mern-todo
JWT_SECRET=yourSecretKey
```

---

## Part 2: Frontend (React)

### Install Dependencies

Create a React app for the frontend:

```bash
npx create-react-app frontend
cd frontend
npm install axios react-router-dom react-hot-toast
```

### Frontend Structure

```
/src
  /components
    - Login.js
    - Register.js
    - TodoApp.js
  /context
    - AuthContext.js
  App.js
  index.js
```

### **Auth Context (src/context/AuthContext.js)**

Context for managing authentication state.

```javascript
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
```

### **Login Component (src/components/Login.js)**

```javascript
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/auth/login", { email, password });
			setAuth(response.data);
			navigate("/todos");
			toast.success("Login successful");
		} catch (error) {
			toast.error("Login failed");
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
```

### **Register Component (src/components/Register.js)**

```javascript
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/api/auth/register", { name, email, password });
			toast.success("Registration successful");
			navigate("/login");
		} catch (error) {
			toast.error("Registration failed");
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Name"
					required
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
```

### **Todo App Component (src/components/TodoApp.js)**

```javascript
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const TodoApp = () => {
	const [todos, setTodos] = useState([]);
	const [title, setTitle] = useState("");
	const { auth } = useContext(AuthContext);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const response = await axios.get("/api/todos", {
					headers: { Authorization: `Bearer ${auth.token}` },
				});
				setTodos(response.data);
			} catch (error) {
				toast.error("Error fetching todos");
			}
		};
		fetchTodos();
	}, [auth]);

	const addTodo = async () => {
		try {
			const response = await axios.post(
				"/api/todos",
				{ title },
				{
					headers: { Authorization: `Bearer ${auth.token}` },
				}
			);
			setTodos([...todos, response.data]);
			setTitle("");
			toast.success("Todo added");
		} catch (error) {
			toast.error("Error adding todo");
		}
	};

	const deleteTodo = async (id) => {
		try {
			await axios.delete(`/api/todos/${id}`, {
				headers: { Authorization: `Bearer ${auth.token}` },
			});
			setTodos(todos.filter((todo) => todo._id !== id));
			toast.success("Todo deleted");
		} catch (error) {
			toast.error("Error deleting todo");
		}
	};

	const toggleTodo = async (id, completed) => {
		try {
			const response = await axios.put(
				`/api/todos/${id}`,
				{ completed },
				{
					headers: { Authorization: `Bearer ${auth.token}` },
				}
			);
			setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
			toast.success("Todo updated");
		} catch (error) {
			toast.error("Error updating todo");
		}
	};

	return (
		<div>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Add a todo"
			/>
			<button onClick={addTodo}>Add</button>

			<ul>
				{todos.map((todo) => (
					<li key={todo._id}>
						<span
							style={{ textDecoration: todo.completed ? "line-through" : "" }}
						>
							{todo.title}
						</span>
						<button onClick={() => toggleTodo(todo._id, !todo.completed)}>
							{todo.completed ? "Undo" : "Complete"}
						</button>
						<button onClick={() => deleteTodo(todo._id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoApp;
```

### **App.js (Routing Setup)**

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoApp from "./components/TodoApp";
import toast, { Toaster } from "react-hot-toast";

function App() {
	return (
		<AuthProvider>
			<Router>
				<div>
					<Toaster />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/todos" element={<TodoApp />} />
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
```

### **Index.js (Main Entry Point)**

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
```

---

This setup should provide a full-fledged **MERN** stack to-do application with authentication. The backend is built using **Node.js**, **Express**, **MongoDB**, and **JWT** for authentication, while the frontend is handled using **React** with context for managing authentication and **Axios** for making HTTP requests.

If you have questions or run into issues during the setup, feel free to ask!
