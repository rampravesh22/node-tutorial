require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

module.exports = { secretKey };

// THIS IS NOT A GOOD PRACTICE, BECAUSE ITS GOING TO CHANGE EVERYTIME ITS GET REFRESHED
// const crypto = require("node:crypto");
// const secretKey = crypto.randomBytes(32).toString("hex");
// console.log(secretKey);
