const bcrypt = require("bcryptjs");

const users = [
	{
		name: "Admin User",
		email: "admin@gmail.com",
		password: bcrypt.hashSync("12345", 10),
		isAdmin: true,
	},
	{
		name: "John Doe",
		email: "johndoe@gmail.com",
		password: bcrypt.hashSync("12345", 10),
		isAdmin: false,
	},
	{
		name: "Jane Doe",
		email: "janedoe@gmail.com",
		password: bcrypt.hashSync("12345", 10),
		isAdmin: alse,
	},
];

module.exports = User;
