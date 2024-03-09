const chatIndividual = (mapUser, socket, message, callback) => {
  if (!message) {
    console.error("Invalid message format");
    return;
  }
  const { content, recipientId } = message;
  const recipientSocketId = mapUser.get(recipientId);
  if (!recipientSocketId) {
    console.error("Recipient not found in the user map");
    return;
  }

  const senderId = mapUser.get(socket.user.id);
  if (!senderId) {
    console.error("Sender not found in the user map");
    return;
  }
  socket.to(recipientSocketId).emit("individual_message", {
    sender: socket.user.id,
    data: content.content,
  });
  callback("message sent successfully");
};

module.exports = chatIndividual;
