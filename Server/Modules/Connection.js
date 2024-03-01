const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://raikungfu:SaintRaiYugi@cluster0.qpgarnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  //"mongodb://127.0.0.1:27017/SocialNetworking"
);

mongoose.connection.on("err", (err) => {
  console.log(err);
});

module.exports = mongoose;
