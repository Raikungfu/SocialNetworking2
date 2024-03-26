const { Server } = require("socket.io");
const checkAccess = require("./Middleware/AuthSocket");
const chatGroup = require("./SocketIO/ChatGroup");
const chatIndividual = require("./SocketIO/ChatIndividual");
const { openChatIndividual } = require("./SocketIO/ChatIndividual");
const { openChatGroup } = require("./SocketIO/ChatGroup");
const friendsOnline = require("./SocketIO/FriendOnline");
const { userOnline } = require("./SocketIO/FriendOnline");
const createMeeting = require("./SocketIO/Meeting");
const {
  joinMeeting,
  joinMeetingSuccess,
  saveCandidate,
  updateMeeting,
  getCandidate,
} = require("./SocketIO/Meeting");

const allowedOrigins = [
  "http://localhost:5173",
  "https://socialnetworkingclient.onrender.com",
  "https://raiyugi-socialnetworking.onrender.com",
];

const userSocketMap = new Map();

const startSocketIOServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
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
    userOnline(socket, userSocketMap);
    console.log(`A user connected: ${socket.id}`);

    socket.on("login", (message) => {
      console.log(message);
    });

    socket.on("massage:group", (message, callback) => {
      chatGroup(io, socket, message, callback, userSocketMap);
    });

    socket.on("message:individual", (message, callback) => {
      chatIndividual(userSocketMap, socket, message, callback);
    });

    socket.on("open:chatIndividual", (chatIndividualUser, callback) => {
      openChatIndividual(socket, chatIndividualUser, callback);
    });

    socket.on("open:chatGroup", (roomId, callback) => {
      openChatGroup(socket, roomId, callback);
    });

    socket.on("create:meeting", (offer, callback) => {
      createMeeting(socket, offer, callback);
    });

    socket.on("send:offer", (data, callback) => {
      io.to(userSocketMap.get(data._userId)).emit("receive-offer", {
        _userId: socket.user.id,
        _roomId: data._roomId,
        offer: data.offer,
      });
      // updateMeeting(socket, data);
    });

    socket.on("join:meeting", (roomId, callback) => {
      joinMeeting(io, socket, roomId, callback);
    });

    socket.on("join:meetingSuccess", (data, callback) => {
      // joinMeetingSuccess(io, socket, data, callback);
      io.to(userSocketMap.get(data._userId)).emit("join_room_success", {
        _roomId: data._roomId,
        _userId: socket.user.id,
        answer: data.answer,
      });
    });

    socket.on("ice:candidate", (data, callback) => {
      socket.to(data._roomId).emit("ice_candidate", {
        _userId: socket.user.id,
        candidate: data.candidate,
      });
      console.log(data);
      // saveCandidate(socket, data);
    });

    socket.on("get:iceCandidateSuccess", (data, callback) => {
      // getCandidate(socket, data, callback);
    });

    socket.on("friend:checkOnline", (data, callback) => {
      friendsOnline(socket, data, userSocketMap, callback);
    });

    socket.on("individual:typing", (recipient) => {
      socket
        .to(userSocketMap.get(recipient))
        .emit("individual_typing", { roomId: userId });
    });

    socket.on("group:typing", (roomId) => {
      io.to(roomId).emit("group_typing", { roomId: userId });
    });

    socket.on("disconnect", (reason) => {
      userSocketMap.delete(userId);
      console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
    });
  });
};

module.exports = { startSocketIOServer };
