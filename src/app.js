const express = require("express");
require("./configuration/dbConfig");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
