const RoomChatGroup = require("../Modules/RoomChatGroup");
const Meeting = require("../Modules/Meeting");
const Candidate = require("../Modules/Candidate");
const createMeeting = async (socket, offer, callback) => {
  await new Meeting({ users: { _id: socket.user.id } })
    .save()
    .then((newRoom) => {
      try {
        socket.join(newRoom._id.toString());
        callback(newRoom._id);
      } catch (err) {
        console.log(err);
      }
    });
};

const updateMeeting = async (socket, data) => {
  try {
    console.log(data);
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

const joinMeeting = async (io, socket, roomId, callback) => {
  socket.join(roomId.roomId);
  await Meeting.findById(roomId.roomId)
    .then((existRoom) => {
      const offer =
        existRoom.users[0]._id !== socket.user.id
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

const joinMeetingSuccess = async (io, socket, data, callback) => {
  try {
    await Meeting.findByIdAndUpdate(
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
        socket.to(data._roomId).emit("join_room_success", {
          _roomId: data._roomId,
          _userId: socket.user.id,
          answer: data.answer,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

const saveCandidate = async (socket, data, callback) => {
  // try {
  //   Candidate.findOneAndUpdate(
  //     { userId: socket.user.id },
  //     { $addToSet: { candidate: data.candidate } },
  //     { upsert: true, new: true }
  //   )
  //     .then((updatedCandidate) => {})
  //     .catch((error) => {});
  // } catch (err) {
  //   console.log(err);
  // }
};

const getCandidate = async (socket, data, callback) => {
  try {
    await Candidate.findOne({ userId: socket.user.id })
      .then((existMeeting) => {
        if (existMeeting) {
          callback(existMeeting);
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
