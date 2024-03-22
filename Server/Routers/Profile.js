const express = require("express");
const app = express();

const Account = require("../Modules/account");

app.post("/upload-avt", async function (req, res, next) {
  const userId = req.user.id;
  if (req.body.data && req.body.data["chat-attach-file-input"]) {
    const avt = req.body.data["chat-attach-file-input"][0].url;

    if (avt) {
      await Account.findByIdAndUpdate(userId, { avt: avt }, { new: true })
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
  }
});

app.post("/upload-cover", async function (req, res, next) {
  const userId = req.user.id;
  const cover = req.body.data["chat-attach-file-input"][0].url;
  if (cover) {
    await Account.findByIdAndUpdate(userId, { cover: cover }, { new: true })
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
