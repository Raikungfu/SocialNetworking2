const Account = require("../Modules/account");

const friendsOnline = async (socket, data, userSocketMap, callback) => {
  const { page, numberNewRecord } = data;
  try {
    const user = await Account.findById(socket.user.id)
      .skip((page - 1) * 10 + numberNewRecord)
      .limit(10)
      .populate("friendsList.friend", "_id avt name");

    if (!user) {
      callback({ error: "User not found" });
      return;
    }

    const friendList = user.friendsList || [];
    const friendOnline = friendList.map((friend) => {
      return {
        _id: friend.friend._id,
        avt: friend.friend.avt,
        name: friend.friend.name,
        online: !!userSocketMap.get(friend.friend.id),
      };
    });

    callback(friendOnline);
  } catch (err) {
    console.log(err);
    callback({ error: "Server error!" });
  }
};

const userOnline = async (socket, userSocketMap) => {
  try {
    const user = await Account.findById(socket.user.id)
      .select("_id name avt friendsList")
      .populate("friendsList.friend", "_id");
    user.friendsList.forEach((friend) => {
      const friendOnline = userSocketMap.get(friend.friend.id);
      if (friendOnline) {
        socket.to(friendOnline).emit("noti", {
          avt: user.avt,
          info: `Best friend online`,
          message: `Best friend <strong>${user.name}</strong> online. Message now....`,
          type: "active",
        });

        socket.to(friendOnline).emit("friend-online", {
          _id: socket.user.id,
          name: socket.user.name,
          avt: socket.user.avt,
          online: true,
        });
      }
    });
  } catch (err) {
    console.log(err);
    callback({ error: "Server error!" });
  }
};

module.exports = friendsOnline;
module.exports.userOnline = userOnline;
