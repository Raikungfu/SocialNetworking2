const Account = require("../Modules/account");

const friendsOnline = async (socket, data, userSocketMap, callback) => {
  const { page, numberNewRecord } = data;
  try {
    const user = await Account.findById(socket.user.id)
      .skip((page - 1) * 10 + numberNewRecord)
      .limit(10)
      .populate("friendsList.friend", "username avt age gender name");

    if (!user) {
      callback({ error: "User not found" });
      return;
    }

    const friendList = user.friendsList || [];
    const friendOnline = friendList.map((friend) => {
      return {
        id: friend.friend._id,
        username: friend.friend.username,
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

module.exports = friendsOnline;
