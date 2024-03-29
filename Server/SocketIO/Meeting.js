const Meeting = require("../Modules/Meeting");
const createMeeting = async (socket, offer, callback, io) => {
  await new Meeting({ users: { _id: socket.user.id } })
    .save()
    .then((newRoom) => {
      try {
        socket.join(newRoom._id.toString());
        io.to(newRoom._id).emit("join_room_success");
        callback({
          _roomId: newRoom._id.toString(),
          _userId: socket.user.id,
        });
      } catch (err) {
        console.log(err);
      }
    });
};

const updateMeeting = async (socket, data) => {
  try {
    await Meeting.findOneAndUpdate(
      {
        _id: data._roomId,
        "users._id": socket.user.id,
      },
      {
        $set: {
          "users.$.offer": data.offer,
          "users.$.answer": data.answer,
        },
      },
      { new: true }
    ).then((newRoom) => {});
  } catch (err) {
    console.log(err);
  }
};

const joinMeeting = async (io, socket, data, callback) => {
  socket.join(data._roomId);
  await Meeting.findById(data._roomId)
    .then((existRoom) => {
      if (existRoom) {
        socket.to(data._roomId).emit("new_user_join", {
          _userId: socket.user.id,
          _roomId: data._roomId,
          _userName: socket.user.name,
        });
        io.to(data._roomId).emit("join_room_success");
        callback({
          _roomId: data._roomId,
          _userId: socket.user.id,
        });
      } else {
        callback({ error: "Couldn't found room" });
      }
    })
    .catch((err) => {
      callback({ error: err });
    });
};

const joinMeetingSuccess = async (io, socket, data, callback) => {
  try {
    socket.to(data._roomId).emit("join_room_success", {
      _roomId: data._roomId,
      _userId: socket.user.id,
      answer: data.answer,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = createMeeting;
module.exports.joinMeeting = joinMeeting;
module.exports.joinMeetingSuccess = joinMeetingSuccess;
module.exports.updateMeeting = updateMeeting;
