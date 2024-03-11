const chatGroup = (io, message) => {
  io.to("groupRoom").emit("group_message", message);
};

const openChatGroup = (socket, chatIndividualUserID, callback) => {
  socket.chattingWith.add(chatIndividualUserID);
  const otherUsers = Array.from(socket.chattingWith).filter(
    (userId) => userId !== chatIndividualUserID
  );
  callback({
    id: socket.user.id,
    name: socket.user.name,
    avatar: socket.user.avatar,
    online: true,
    status: "online",
    isTyping: false,
    otherUsers,
  });
};

const listChatGroups = async (socket, callback) => {
  // const listChatIndividuals = await Account.findById(socket.user.id)
  //   .populate("chatIndividual.recipient", "name _id")
  //   .select("chatIndividual.recipient chatIndividual.chatRoomId")
  //   .then((user) => {
  //     return user.chatIndividual;
  //   });
};

module.exports = chatGroup;
