const { Server } = require("socket.io");
const checkAccess = require("./Middleware/AuthSocket");
const chatGroup = require("./SocketIO/ChatGroup");
const chatIndividual = require("./SocketIO/ChatIndividual");
const {
  openChatIndividual,
  listChatIndividuals,
} = require("./SocketIO/ChatIndividual");
const friendsOnline = require("./SocketIO/FriendOnline");

const allowedOrigins = [
  "http://localhost:5173",
  "https://socialnetworkingclient.onrender.com",
];

const userSocketMap = new Map();

const startSocketIOServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
  }).use((socket, next) => {
    checkAccess(socket, (err, user) => {
      if (err) {
        next(new Error("Unauthorized"));
      } else {
        next();
      }
    });
  });

  io.on("connection", (socket) => {
    const userId = socket.user.id;
    userSocketMap.set(userId, socket.id);
    console.log(`A user connected: ${socket.id}`);

    socket.on("login", (message) => {
      console.log(message);
    });

    socket.on("massage:group", (message) => {
      chatGroup(io, message);
    });

    socket.on("message:individual", (message, callback) => {
      chatIndividual(userSocketMap, socket, message, callback);
    });

    socket.on("open:chatIndividual", (chatIndividualUser, callback) => {
      openChatIndividual(socket, chatIndividualUser, callback);
    });

    socket.on("friend:checkOnline", (data, callback) => {
      friendsOnline(socket, data, userSocketMap, callback);
    });

    socket.on("chat:ListChatIndividuals", (data, callback) => {
      listChatIndividuals(socket, callback);
    });

    socket.on("chat:ListChatGroups", (data, callback) => {
      friendsOnline(socket, data, userSocketMap, callback);
    });

    socket.on("individual:typing", (recipient) => {
      socket
        .to(userSocketMap.get(recipient))
        .emit("individual_typing", "typing...");
    });

    socket.on("disconnect", (reason) => {
      userSocketMap.delete(userId);
      console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
    });
  });
};

module.exports = { startSocketIOServer };
