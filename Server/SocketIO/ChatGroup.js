const RoomChatGroup = require("../Modules/RoomChatGroup");

const openChatGroup = async (io, socket, roomId, callback) => {
  socket.join(roomId);
  await RoomChatGroup.findById(roomId)
    .select("members")
    .populate("members", "name avt _id")
    .then((members) => {
      callback(members.members);
    });
};

const chatGroup = (io, socket, message, callback) => {
  try {
    if (!message || !message.content || !message.roomId) {
      console.error("Invalid message format");
      callback("Invalid message");
      return;
    }

    const { content, roomId } = message;

    RoomChatGroup.findById(roomId)
      .then((chatGroup) => {
        if (!chatGroup) {
          console.error(`Chat group not found for roomId: ${roomId}`);
          callback("Chat group not found");
          return;
        }

        chatGroup.messages.push({
          sender_id: socket.user.id,
          content: content,
        });
        (chatGroup.sender = socket.user.name),
          (chatGroup.lastMessage = content.content || "File");
        chatGroup.timeStamp = Date.now();

        return chatGroup.save();
      })
      .then((savedchatGroup) => {
        io.to(roomId).emit("group_message", {
          sender: socket.user.id,
          roomId: socket.user.id,
          content: content,
          createdAt: new Date(),
        });
        callback("sent");
      })
      .catch((error) => {
        console.error(`Error finding or saving chat group: ${error}`);
        callback("Error finding or saving chat group");
      });
  } catch (error) {
    console.error(`Error saving chat group: ${error}`);
  }
};

module.exports = chatGroup;
module.exports.openChatGroup = openChatGroup;
