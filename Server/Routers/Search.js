const express = require("express");
const app = express();
const Account = require("../Modules/account");

app.get("/", async (req, res) => {
  try {
    const data = req.query.data;
    const Friends = await Account.findById(req.user.id)
      .select("friendsList.friend")
      .populate({
        path: "friendsList.friend",
        match: { name: { $regex: data, $options: "i" } },
        select: "_id name gender age avt",
      })
      .then((data) => {
        return data.friendsList
          .filter((friend) => friend && friend.friend)
          .map((friend) => ({
            _id: friend.friend._id,
            name: friend.friend.name,
            gender: friend.friend.gender,
            age: friend.friend.age,
            avt: friend.friend.avt,
          }));
      });

    const idFriend = Friends.map((friend) => friend._id);
    idFriend.push(req.user.id);
    const Others = await Account.find({
      _id: { $nin: idFriend },
      name: { $regex: data, $options: "i" },
    })
      .select("_id name gender age avt")
      .then((data) => {
        return data;
      });
    res.status(200).json([{ Friends }, { Others }]);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = app;
