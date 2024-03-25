const RoomChatGroup = require("../Modules/RoomChatGroup");
const Meeting = require("../Modules/Meeting");
const createMeeting = async (socket, offer, callback) => {
  new Meeting({
    users: [
      {
        _id: socket.user.id,
        offer: offer.offer,
      },
    ],
  })
    .save()
    .then((newRoom) => {
      try {
        socket.join(newRoom._id.toString());
        callback({
          _roomId: newRoom._id,
          _userId: socket.user.id,
          offer: newRoom.users[0].offer,
        });
      } catch (err) {
        console.log(err);
      }
    });
};

const joinMeeting = (io, socket, roomId, callback) => {
  socket.join(roomId.roomId);
  Meeting.findById(roomId.roomId)
    .then((existRoom) => {
      callback({
        _roomId: existRoom._id,
        _userId: socket.user.id,
        offer: existRoom.users[0].offer,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const joinMeetingSuccess = (io, socket, data, callback) => {
  Meeting.findByIdAndUpdate(data.roomId, {
    $addToSet: {
      users: {
        _id: socket.user.id,
        offer: data.answer,
      },
    },
  })
    .then((existRoom) => {
      io.to(data.roomId).emit("join_room_success", {
        _id: socket.user.id,
        answer: data.answer,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = createMeeting;
module.exports.joinMeeting = joinMeeting;
module.exports.joinMeetingSuccess = joinMeetingSuccess;
