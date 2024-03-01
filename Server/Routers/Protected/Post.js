const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const Cookies = require("cookies");

const PostModel = require("../../Modules/Post");
const AccountModel = require("../../Modules/account");

app.use(function (req, res, next) {
  next();
});

app.get("/", function (req, res, next) {});

app.post("/", function (req, res, next) {
  console.log("sads");
  const post = req.body["post-content"];
  const url = req.body["urlFile"];
  const id = req.userData.id;
  console.log(id + "  " + " " + post + " " + url);
  AccountModel.findById(id)
    .then((existingUser) => {
      if (existingUser) {
        new PostModel({}).save();
      } else {
        throw new Error("User not found!");
      }
    })
    .catch((err) => {
      console.log("New access token found", err);
      reject(err);
    });
  return res.status(200).json("");
});

app.delete("/:id", function (req, res, next) {});

module.exports = app;
