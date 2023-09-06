const express = require("express");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const users = data.users;
const server = express();
server.use(express.json());
//-----------------------------

exports.createUser = (req, res) => {
	const user = req.body;
	const findUser = users.find((p) => p.id === user.id);
	if (findUser) {
		res.send(`${user.id} id user is already exists`);
		return;
	} else {
		users.push(user);
		res.send("user added");
	}
};

exports.getAllUser = (req, res) => {
	res.send(users);
};

exports.getUser = (req, res) => {
	const id = +req.params.id;
	const user = users.find((p) => p.id === id);
	res.send(user);
};

exports.updateUser = (req, res) => {
	const idParams = +req.params.id;
	const userIndex = users.findIndex((p) => p.id === idParams);
	users.splice(userIndex, 1, { ...req.body, id: idParams });

	res.status(201).send("user updated");
};

exports.partialUpdaeUser = (req, res) => {
	const id = req.params.id;
	const userIndex = users.findIndex((p) => p.id === id);
	const oldProduct = users[userIndex];
	users.splice(userIndex, 1, { ...oldProduct, ...req.body });
	res.send("patch updated");
};

exports.deleteUser = (req, res) => {
	const id = req.params.id;
	const userIndex = users.findIndex((p) => p.id === id);
	users.splice(userIndex, 1);
	res.send("prdocut  deleted");
};
