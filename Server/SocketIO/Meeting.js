const RoomChatGroup = require("../Modules/RoomChatGroup");
const Meeting = require("../Modules/Meeting");
const Candidate = require("../Modules/Candidate");
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
      socket.to(data._roomId).emit("new_user_join", {
        _userId: socket.user.id,
        _roomId: data._roomId,
      });
      io.to(data._roomId).emit("join_room_success");
      callback({
        _roomId: data._roomId,
        _userId: socket.user.id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const joinMeetingSuccess = async (io, socket, data, callback) => {
  try {
    socket.to(data._roomId).emit("join_room_success", {
      _roomId: data._roomId,
      _userId: socket.user.id,
      answer: data.answer,
    });
    // await Meeting.findByIdAndUpdate(
    //   data._roomId,
    //   {
    //     $addToSet: {
    //       users: {
    //         _id: socket.user.id,
    //         offer: data.offer,
    //         answer: data.answer,
    //       },
    //     },
    //   },
    //   { new: true }
    // )
    //   .then((existRoom) => {})
    //   .catch((err) => {
    //     console.log(err);
    //   });
  } catch (err) {
    console.log(err);
  }
};

const saveCandidate = async (socket, data) => {
  try {
    Candidate.findOneAndUpdate(
      { roomId: data._roomId, userId: socket.user.id },
      { $addToSet: { candidate: data.candidate } },
      { upsert: true, new: true }
    ).catch((error) => {
      console.log(error);
    });
  } catch (err) {
    console.log(err);
  }
};

const getCandidate = async (socket, data, callback) => {
  try {
    console.log(data);
    await Candidate.findOne({
      roomId: data._roomId,
      userId: { $ne: socket.user.id },
    })
      .sort({ _id: -1 })
      .then((existMeeting) => {
        if (existMeeting) {
          if (
            existMeeting &&
            existMeeting.candidate &&
            Array.isArray(existMeeting.candidate)
          ) {
            const candidates = existMeeting.candidate.map((meeting) => {
              return {
                candidate: meeting.candidate,
                sdpMid: meeting.sdpMid,
                sdpMLineIndex: meeting.sdpMLineIndex,
                usernameFragment: meeting.usernameFragment,
              };
            });
            callback(candidates);
          } else {
            callback(new Error("Invalid roomId"));
            console.log("Error...");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = createMeeting;
module.exports.joinMeeting = joinMeeting;
module.exports.joinMeetingSuccess = joinMeetingSuccess;
module.exports.saveCandidate = saveCandidate;
module.exports.updateMeeting = updateMeeting;
module.exports.getCandidate = getCandidate;
