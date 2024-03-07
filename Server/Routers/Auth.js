const express = require("express");
const app = express();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const Cookies = require("cookies");

const Account = require("../Modules/account");
const { genAccessToken, genRefreshToken } = require("../Middleware/Auth");

app.post("/register", function (req, res, next) {
  var email = req.body.email;
  var pw = req.body.password;
  var age = req.body.age;
  var gender = req.body.gender;
  Account.findOne({ username: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ error: "User existed! Please login." });
      } else {
        new Account({
          username: email,
          password: pw,
          age: age,
          gender: gender,
          name: email.split("@")[0],
        })
          .save()
          .then((newUser) => {
            res.status(200).json("Register success!");
          })
          .catch((err) => {
            res.status(500).json({ error: "Database Error!" });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: "Check User error" });
    });
});

app.post("/login", function (req, res, next) {
  var id = req.body.email;
  var pw = req.body.password;
  checkLogin(id, pw, req, res)
    .then((data) => {
      res.status(200).json({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        name: data.existingUser.name,
        avt: data.existingUser.avt,
        userName: data.existingUser.username,
      });
    })
    .catch((err) => {
      if (err instanceof Error) {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An error occurred" });
      }
    });
});

function checkLogin(email, password, req, res) {
  return new Promise((resolve, reject) => {
    try {
      Account.findOne({
        username: email,
        password: password,
      }).then((existingUser) => {
        if (existingUser) {
          var accessToken = genAccessToken(
            existingUser,
            "user",
            fs.readFileSync("./Key/AccessToken/privateKey.pem"),
            "1d",
            "RS256"
          );
          var refreshToken = genRefreshToken(
            existingUser,
            "user",
            fs.readFileSync("./Key/RefreshToken/privateKey.pem"),
            "30d",
            "RS256"
          );
          resolve({ accessToken, refreshToken, existingUser });
        } else {
          reject(new Error("ID/Password not correct!"));
        }
      });
    } catch (error) {
      reject("An error occurred:", error);
    }
  });
}

module.exports = app;
