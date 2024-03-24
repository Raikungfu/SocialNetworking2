const express = require("express");
const app = express();

const Meeting = require("../Modules/Meeting");

app.post("/meeting-room", async function (req, res) {
  const { offer } = req.body.roomWithOffer;
  const userId = req.user.id;
  new Meeting({
    users: [
      {
        _id: userId,
        offer: offer,
      },
    ],
  })
    .save()
    .then((newRoom) => {
      try {
        res
          .status(200)
          .json({ _id: newRoom._id, offer: newRoom.users[0].offer });
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
