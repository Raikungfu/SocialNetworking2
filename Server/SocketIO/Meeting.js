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
      const offer =
        existRoom.users[0].id !== socket.user.id
          ? existRoom.users[0].offer
          : existRoom.users[1].offer;
      callback({
        _roomId: roomId.roomId,
        _userId: socket.user.id,
        offer: offer,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const joinMeetingSuccess = (io, socket, data, callback) => {
  try {
    Meeting.findByIdAndUpdate(
      data._roomId,
      {
        $addToSet: {
          users: {
            _id: socket.user.id,
            offer: data.offer,
            answer: data.answer,
          },
        },
      },
      { new: true }
    )
      .then((existRoom) => {
        io.to(data._roomId).emit("join_room_success", {
          _roomId: data._roomId,
          _userId: socket.user.id,
          answer: data.offer,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = createMeeting;
module.exports.joinMeeting = joinMeeting;
module.exports.joinMeetingSuccess = joinMeetingSuccess;
