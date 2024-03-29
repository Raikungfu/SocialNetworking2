const Account = require("../Modules/account");

const addFriend = (userSocketMap, socket, data, callback) => {
  let friendId = data.friendId;
  Account.findByIdAndUpdate(
    { _id: friendId },
    { $push: { friendsRequest: socket.user.id } },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return callback(new Error("No user found"));
      }
      Account.findByIdAndUpdate(
        { _id: socket.user.id },
        { $push: { friendsRequestSent: friendId } },
        { new: true }
      )
        .then((result) => {
          if (!result) {
            return callback(new Error("No user found"));
          } else {
            socket
              .to(userSocketMap.get(friendId))
              .emit("new-friend-request", result);
            socket.to(friendId).emit("noti", {
              header: "New friend request sent",
              info: `From: <strong>${socket.user.name}</strong>`,
              type: "success",
            });
            return callback("Add friend successfully!");
          }
        })
        .catch((err) => {
          return callback(err);
        });
    })
    .catch((err) => {
      return callback(err);
    });
};

module.exports = addFriend;
