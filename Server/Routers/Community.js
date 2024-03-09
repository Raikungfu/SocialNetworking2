const express = require("express");
const app = express();

const Account = require("../Modules/account");

app.get("/", function (req, res, next) {
  const page = req.query.page;
  Account.findOne({ _id: req.user.id }).then((data) => {
    const idFriendList = data.friendsList.map((friend) => friend.friend);
    Account.find({ _id: { $nin: [req.user.id, ...idFriendList] } })
      .sort({ name: 1, username: 1, age: 1 })
      .skip((page - 1) * 10)
      .limit(10)
      .select("username avt age gender name")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Server error!");
      });
  });
});

app.get("/profile/:userId", function (req, res, next) {
  const userId = req.params.userId;
  User.findById(userId)
    .select("_id username avt bio name age followers following posts createdAt")
    .populate([
      { path: "posts", select: "-__v" },
      {
        path: "following",
        select: "_id username avt name",
      },
    ])
    .exec()
    .then((doc) => {
      if (!doc) {
        return res.status(404).send().json({
          message: "User not found!",
        });
      }
      res.status(200).json(doc);
    })
    .catch((e) => {
      return next(e);
    });
});

app.put("/follow/:userId", function (req, res, next) {
  let userId = req.body.userId || req.params.userId;
  User.findByIdAndUpdate(userId, { $push: { followers: req.user._id } })
    .then(() => {
      return User.findByIdAndUpdate(req.user._id, {
        $push: { following: userId },
      }).select("-password");
    })
    .then((user) => {
      user.password = "";
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
});

app.delete("/unfollow/:userId", function (req, res, next) {
  const userId = req.params.userId;
  User.findById(req.user._id)
    .then((user) => {
      const index = user.following.indexOf(userId);
      if (index !== -1) {
        user.following.splice(index, 1);
        return user.save();
      } else {
        return Promise.reject({
          status: 400,
          msg: "User not found in your following list",
        });
      }
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
});

module.exports = app;
