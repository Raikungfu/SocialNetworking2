const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');
const Cookies = require('cookies')

const AccountModel = require("../Modules/account");

app.use(function (req, res, next) {
  next();
});

app.post("/register", function (req, res, next) {
  var email = req.body.email;
  var pw = req.body.password;
  var age = req.body.age;
  var gender = req.body.gender;
  AccountModel.findOne({ username: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ error: "User existed! Please login." });
      } else {
        new AccountModel({
          username: email,
          password: pw,
          age: age,
          gender: gender,
          name: email.split('@')[0]
        })
          .save()
          .then((newUser) => {
            res.status(200).json(newUser);
          })
          .catch((err) => {
            res.status(500).json({ error: "Database Error!" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Check User error" });
    });
});

app.post("/login", function (req, res, next) {
  var id = req.body.email;
  var pw = req.body.password;
  checkLogin(id, pw, req, res)
    .then((data) => {
      res.status(200).json({ accessToken: data.accessToken, refreshToken: data.refreshToken,  name: data.existingUser.name, avt: data.existingUser.avt, userName: data.existingUser.username});
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
      AccountModel.findOne({
        username: email,
        password: password,
      }).then((existingUser) => {
        if (existingUser) {
          privateKeyA = fs.readFileSync("./Key/AccessToken/privatekey.pem");
          var accessToken = jwt.sign({ username: existingUser.username, name: existingUser.name, avt: existingUser.avt, id: existingUser._id, role: "user" }, privateKeyA, {
            expiresIn: "60s",
            algorithm: "RS256",
          });
          privateKeyR = fs.readFileSync("./Key/RefreshToken/privatekey.pem");
          var refreshToken = jwt.sign({ id: existingUser._id, role: "user" }, privateKeyR, {
              expiresIn: "1d",
              algorithm: "RS256",
          });
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
