const express = require("express");
const app = express();

const Account = require("../Modules/account");

app.get("/", function (req, res, next) {
  const page = req.query.page;
  Account.find()
    .sort({ name: 1, username: 1, age: 1 })
    .skip((page - 1) * 10)
    .limit(10)
    .select("username avt age gender name")
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    });
});

module.exports = app;
