const { Server } = require("socket.io");
const checkAccess = require("./Middleware/AuthSocket");

const allowedOrigins = [
  "http://localhost:5173",
  "https://socialnetworkingclient.onrender.com",
];

const startSocketIOServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    socket.user = checkAccess(socket);
    console.log(socket.user);
    next();
  });

  const chatGroup = require("./SocketIO/ChatGroup");
  const chatIndividual = require("./SocketIO/ChatIndividual");

  const onConnection = (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("", (message) => {
      console.log(message);
      chatGroup(io, message);
    });

    socket.on("massage:group", (message) => {
      console.log(message);
      chatGroup(io, message);
    });
    socket.on("message:individual", (message) => {
      console.log(message);
      chatIndividual(socket, message);
    });

    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
    });
  };

  io.on("connection", onConnection);
};

module.exports = { startSocketIOServer };
