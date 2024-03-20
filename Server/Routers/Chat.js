const express = require("express");
const app = express();
const RoomIndividual = require("../Modules/RoomChatIndividual");
const Account = require("../Modules/account");
const RoomChatGroup = require("../Modules/RoomChatGroup");

app.get("/chat-individual", async function (req, res) {
  let { newPageStart, numberNewChat, chatWith, roomId } = req.query;
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
    const skip = room.messages.length - newPageStart * 10 + numberNewChat * 1;
    const messages = room.messages.slice(skip - 10, skip);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/chat-group", async function (req, res) {
  let { newPageStart, numberNewChat, chatWith, roomId } = req.query;
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
      const room = account.chatGroup.find(
        (room) => room.chatRoomId.toString() === chatWith.id
      );
      if (!room) {
        return res.status(400).json({ error: "Room not found" });
      }
      roomId = room.chatRoomId;
    }
    const room = await RoomChatGroup.findById(roomId);
    if (!room) {
      return res.status(400).json({ error: "Chat room not found" });
    }

    const skip = room.messages.length - newPageStart * 10 + numberNewChat * 1;
    const messages = room.messages.slice(skip - 10, skip);
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
    name: req.user.name + ", " + name,
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

app.get("/listChatIndividual", async (req, res) => {
  Account.findById(req.user.id)
    .populate("chatIndividual.recipient", "name _id")
    .populate("chatIndividual.chatRoomId", "lastMessage timeStamp sender")
    .select("chatIndividual.recipient chatIndividual.chatRoomId")
    .then((user) => {
      res.status(200).json(user.chatIndividual);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

app.get("/listChatGroup", async (req, res) => {
  try {
    Account.findById(req.user.id)
      .select("chatGroup")
      .populate({
        path: "chatGroup",
        populate: {
          path: "chatRoomId",
          select: "name _id lastMessage timeStamp sender",
        },
      })
      .then((account) => {
        const chatRooms = account.chatGroup.map((group) => group.chatRoomId);
        res.status(200).json(chatRooms);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
