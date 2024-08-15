const express = require("express");
// const data = require("./dbCongig");
const app = express();
const PORT = process.env.PORT || 5000;
// console.log(data);
app.listen(PORT, () => {
	console.log(`server is running on http://localhost:${PORT}`);
});
