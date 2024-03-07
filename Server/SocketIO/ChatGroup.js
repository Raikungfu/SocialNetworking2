const chatGroup = (io, message) => {
  console.log(message);
  io.to("groupRoom").emit("group_message", message);
};

module.exports = chatGroup;
