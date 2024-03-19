const express = require("express");
const app = express();
const RoomIndividual = require("../Modules/RoomChatIndividual");
const Account = require("../Modules/account");
const RoomChatGroup = require("../Modules/RoomChatGroup");

app.get("/chat-individual", async function (req, res) {
  let { page, chatWith, roomId } = req.query;
  const me = req.user.id;

  try {
    if (!chatWith) {
      return res.status(400);
    }
    if (!roomId) {
      const account = await Account.findById(me);
      if (!account) {
        return res.status(400).json({ error: "User not found" });
      }
      const room = account.chatIndividual.find(
        (room) => room.recipient.toString() === chatWith.id
      );
      if (!room) {
        return res.status(400).json({ error: "Room not found" });
      }
      roomId = room.chatRoomId;
    }
    const room = await RoomIndividual.findById(roomId);
    if (!room) {
      return res.status(400).json({ error: "Chat room not found" });
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

app.get("/chat-group", async function (req, res) {
  let { page, chatWith, roomId, me } = req.query;

  try {
    if (!chatWith) {
      return res.status(400);
    }
    if (!roomId) {
      const account = await Account.findById(me);
      if (!account) {
        return res.status(400).json({ error: "User not found" });
      }
      const room = account.chatIndividual.find(
        (room) => room.recipient.toString() === chatWith.id
      );
      if (!room) {
        return res.status(400).json({ error: "Room not found" });
      }
      roomId = room.chatRoomId;
    }
    const room = await RoomIndividual.findById(roomId);
    if (!room) {
      return res.status(400).json({ error: "Chat room not found" });
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

app.post("/chat-group", async function (req, res) {
  const { listUsers, message, name } = req.body;
  const userId = req.user.id;
  listUsers.push(userId);
  new RoomChatGroup({
    members: listUsers,
    message: message,
    name: "Group: " + req.user.name + ", " + name,
  })
    .save()
    .then(async (newRoom) => {
      try {
        await Account.updateMany(
          { _id: { $in: listUsers } },
          { $push: { chatGroup: { chatRoomId: newRoom._id } } }
        ).exec();
        res.status(200).json({ roomId: newRoom._id, name: newRoom.name });
      } catch (err) {
        console.log(err);
      }
    });
});

module.exports = app;
