const Account = require("../Modules/account");
const RoomIndividual = require("../Modules/RoomChatIndividual");
const RoomChatIndividual = require("../Modules/RoomChatIndividual");

const chatIndividual = (userMap, socket, message, callback) => {
  if (!message || !message.content || !message.recipientId || !message.roomId) {
    console.error("Invalid message format");
    callback("Invalid message");
    return;
  }

  const { content, recipientId, roomId } = message;
  const recipientSocketId = userMap.get(recipientId);

  const senderSocketId = userMap.get(socket.user.id);
  if (!senderSocketId) {
    console.error("Sender not found in the user map");
    callback("Invalid sender");
    return;
  }

  RoomChatIndividual.findById(roomId)
    .then((chatIndividual) => {
      if (!chatIndividual) {
        console.error(`Chat individual not found for roomId: ${roomId}`);
        callback("Chat individual not found");
        return;
      }

      chatIndividual.messages.push({
        sender_id: socket.user.id,
        content: content,
      });
      (chatIndividual.sender = socket.user.name),
        (chatIndividual.lastMessage = content.content || "File");
      chatIndividual.timeStamp = Date.now();

      return chatIndividual.save();
    })
    .then((savedChatIndividual) => {
      socket.to(recipientSocketId).emit("individual_message", {
        sender: socket.user.id,
        roomId: socket.user.id,
        content: content,
        createdAt: new Date(),
      });

      socket.to(recipientSocketId).emit("noti", {
        header: "New message",
        info: `From: <strong>${socket.user.name}</strong>`,
        message: `Content: ${content.content || "File"}`,
        type: "info",
      });
      callback("sent");
    })
    .catch((error) => {
      console.error(`Error finding or saving chat individual: ${error}`);
      callback("Error finding or saving chat individual");
    });
};

const openChatIndividual = async (socket, chatIndividualUser, callback) => {
  try {
    const account = await Account.findById(socket.user.id);
    if (!account) {
      return callback({ error: "Couldn't find account" });
    }

    const recipientId = chatIndividualUser.id;
    const chatIndividual = account.chatIndividual.find(
      (chat) => chat.recipient.toString() === recipientId
    );
    if (chatIndividual) {
      return callback({ chatRoomId: chatIndividual.chatRoomId });
    }

    const newRoom = new RoomIndividual();
    await newRoom.save();

    const roomId = newRoom.id;

    account.chatIndividual.push({
      recipient: recipientId,
      chatRoomId: roomId,
    });
    await account.save();

    const otherUser = await Account.findOne({ _id: recipientId });
    if (!otherUser) {
      return callback({ error: "Couldn't find the other user" });
    }

    otherUser.chatIndividual.push({
      recipient: socket.user.id,
      chatRoomId: roomId,
    });
    await otherUser.save();
    callback({ chatRoomId: roomId });
  } catch (error) {
    callback({ error: error.message });
  }
};

module.exports = chatIndividual;
module.exports.openChatIndividual = openChatIndividual;
