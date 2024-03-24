const express = require("express");
const app = express();

const Meeting = require("../Modules/Meeting");

app.post("/meeting-room", async function (req, res) {
  const { offer } = req.body;
  console.log(offer);
  const userId = req.user.id;
  new Meeting({ offer: offer }).save().then((newRoom) => {
    try {
      console.log(newRoom);
      res.status(200).json(newRoom);
    } catch (err) {
      console.log(err);
    }
  });
});

app.get("/meeting-room", async function (req, res) {
  try {
    const roomId = req.query.roomId;
    const room = await Meeting.findById(roomId);

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = app;
