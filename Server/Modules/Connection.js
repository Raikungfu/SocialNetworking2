const mongoose = require("mongoose");
const x = require("dotenv").config();

const mongodb =
  process.env.NODE_ENV === "development"
    ? "mongodb://127.0.0.1:27017/SocialNetworking"
    : "mongodb+srv://raikungfu:SaintRaiYugi@cluster0.qpgarnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongodb);
mongoose.connection.on("err", (err) => {
  console.log(err);
});

module.exports = mongoose;
