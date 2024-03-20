const express = require("express");
const app = express();

const Account = require("../Modules/account");

app.post("/upload-avt", function (req, res, next) {
  const userId = req.user.id;
  const avt = req.body.data["chat-attach-file-input"][0].url;

  if (avt) {
    Account.findByIdAndUpdate(userId, { avt: avt })
      .then((doc) => {
        res.status(200).json(doc.avt);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send("Error updating avt");
      });
  } else {
    res.status(400).send("No avt provided");
  }
});

app.post("/upload-cover", function (req, res, next) {
  const userId = req.user.id;
  const cover = req.body.data["chat-attach-file-input"][0].url;
  if (cover) {
    Account.findByIdAndUpdate(userId, { cover: cover })
      .then((doc) => {
        res.status(200).json(doc.cover);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send("Error updating cover");
      });
  } else {
    res.status(400).send("No cover provided");
  }
});

module.exports = app;
