const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const Cookies = require("cookies");

const Account = require("../Modules/account");
const { genAccessToken, genRefreshToken } = require("../Middleware/Auth");

app.use(function (req, res, next) {
  next();
});

app.get("/requests", function (req, res, next) {
  Account.findById(req.user.id)
    .skip((req.query.page - 1) * 10)
    .limit(10)
    .populate("friendsRequest", "username avt name")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user.friendsRequest);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error!");
    });
});

app.get("/friends", function (req, res, next) {
  Account.findById(req.user.id)
    .skip((req.query.page - 1) * 10)
    .limit(10)
    .populate("friendsList.friend", "username avt age gender name")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user.friendsList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error!");
    });
});

app.get("/add-friend", function (req, res, next) {
  let friendId = req.query.friendId;
  Account.findByIdAndUpdate(
    { _id: friendId },
    { $push: { friendsRequest: req.user.id } },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return next(new Error("No user found"));
      }
      res.status(200).json("Add friend successfully!");
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
});

app.get("/accept-request", function (req, res, next) {
  let friendId = req.query.friendId;
  Account.updateOne(
    { _id: req.user.id },
    {
      $push: { friendsList: { friend: friendId, state: "friend" } },
      $pull: { friendsRequest: friendId },
    },
    { new: true }
  )
    .exec()
    .then((result1) => {
      if (result1) {
        return Account.findByIdAndUpdate(
          friendId,
          { $push: { friendsList: { friend: req.user.id, state: "friend" } } },
          { new: true }
        ).then((result2) => {
          res.status(200).send({ result1, result2 });
        });
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json("Add friend failed!");
      return next(err);
    });
});

module.exports = app;
