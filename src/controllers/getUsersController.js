const { getUsers } = require("../services/getUsersService");

const getUsersController = async (req, res) => {
	try {
		const users = await getUsers();
		res.json(users);
	} catch (error) {
		res.json(error).status(500);
	}
};

module.exports = {
	getUsersController,
};
