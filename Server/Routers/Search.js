const express = require("express");
const app = express();
const Account = require("../Modules/account");

app.get("/", async (req, res) => {
  try {
    const data = req.query.data;
    let idListFriend = await Account.findById(req.user.id)
      .select("friendsList.friend")
      .populate({
        path: "friendsList.friend",
        match: { name: { $regex: data, $options: "i" } },
        select: "_id name gender age avt",
      })
      .then((data) => {
        return data;
      });
    idListFriend = idListFriend.friendsList.filter((friend) => {
      !friend;
      console.log(friend);
    });
    console.log(idListFriend);
    // const allUser = idListFriend.find({name: {$regex: data})
    // const listFriend = Account.find({ name: { $regex: data, $options: "i" } })
    //   .select("name gender age avt")
    //   .then((data) => {
    //     console.log(data);
    //     res.status(200).json(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(403).json(err);
    //   });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
