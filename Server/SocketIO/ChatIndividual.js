const chatIndividual = (socket, message) => {
  console.log("Received individual message from client:", message);

  if (!message || !message.recipientId || !message.content) {
    console.error("Invalid message format");
    return;
  }

  const { recipientId, content } = message;
  io.to(recipientId).emit("individual_message", content);
};

module.exports = chatIndividual;
