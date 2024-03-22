const mongoose = require("mongoose");
const x = require("dotenv").config();

const mongodb =
  process.env.NODE_ENV === "development"
    ? process.env.MONGOOSE_CONNECT_DEV
    : process.env.MONGOOSE_CONNECT_PROD;

mongoose.connect(mongodb);
mongoose.connection.on("err", (err) => {
  console.log(err);
});

module.exports = mongoose;
