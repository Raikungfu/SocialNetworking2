const express = require("express");
const app = express();

const Account = require("../Modules/account");

app.post("/upload-avt", async function (req, res, next) {
  const userId = req.user.id;
  const avt = req.body.data["chat-attach-file-input"][0].url;
  try {
    await Account.findByIdAndUpdate(userId, { avt: avt }, { new: true })
      .then((doc) => {
        res.status(200).json(doc.avt);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send("Error updating avt");
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/upload-cover", async function (req, res, next) {
  const userId = req.user.id;
  const cover = req.body.data["chat-attach-file-input"][0].url;

  try {
    await Account.findByIdAndUpdate(userId, { cover: cover }, { new: true })
      .then((doc) => {
        res.status(200).json(doc.cover);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send("Error updating cover");
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = app;
