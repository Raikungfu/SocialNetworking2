const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://raikungfu:SaintRaiYugi@cluster0.qpgarnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
  }
);

mongoose.connection.on("err", (err) => {
  console.log(err);
});

module.exports = mongoose;
