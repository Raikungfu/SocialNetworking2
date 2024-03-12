const express = require("express");
const app = express();
const RoomIndividual = require("../Modules/RoomChatIndividual");
const Account = require("../Modules/account");

const updateChat = (socket, data) => {
  const user = socket.user;
  Account.findOne();
  if (user && (data["post-content"] || media)) {
    new Post({
      userId: user.id,
      content: data["post-content"],
      createAt: new Date(),
      media: media,
    })
      .save()
      .then((createdPost) => {
        createdPost.userId = user;
        res.status(200).json(createdPost);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  } else {
    res.status(404).json(new Error("No User Found"));
  }
};

app.get("/chat-individual", async function (req, res) {
  let { page, chatWith, roomId, me } = req.query;

  try {
    if (!chatWith) {
      return res.status(404);
    }
    if (!roomId) {
      const account = await Account.findById(me);
      if (!account) {
        return res.status(404).json({ error: "User not found" });
      }
      const room = account.chatIndividual.find(
        (room) => room.recipient.toString() === chatWith.id
      );
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      roomId = room.chatRoomId;
    }
    const room = await RoomIndividual.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Chat room not found" });
    }

    const skip = room.messages.length - page * 10;
    const messages = room.messages.slice(
      Math.max(0, skip),
      Math.max(0, skip + 10)
    );
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = app;
