const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const Cookies = require("cookies");

const AccountModel = require("../Modules/account");

app.post("/refreshToken", (req, res, next) => {
  const cookie = new Cookies(req, res, next);
  const refreshToken = cookie.get("refreshToken");
  checkJWT(refreshToken)
    .then((data) => {
      if (data) {
        genNewAccessToken(data)
        .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            if (err instanceof Error) {
              res.status(404).json({ error: err.message });
            } else {
              res.status(500).json({ error: "An error occurred" });
            }
          });
      }
    })
    .catch((error) => {
      res.status(403).json(error.message);
    });
});

app.get("/", (req, res, next) => {
  if (req.userData) {
    res.status(200).json({ name: req.userData.name, avt: req.userData.avt });
  }
});

function genNewAccessToken(data, req, res) {
  return new Promise((resolve, reject) => {
    AccountModel.findById(data.id)
      .then((existingUser) => {
        if (existingUser) {
          privateKey = fs.readFileSync("./Key/AccessToken/privatekey.pem");
          var accessToken = jwt.sign(
            {
              username: existingUser.username,
              name: existingUser.name,
              avt: existingUser.avt,
              id: existingUser._id,
              role: "user",
            },
            privateKey,
            {
              expiresIn: "60s",
              algorithm: "RS256",
            }
          );
          resolve({accessToken: accessToken, userName: existingUser.username, name: existingUser.name, avt: existingUser.avt});
        } else {
          throw new Error("User not found!");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function checkJWT(token) {
  return new Promise((resolve, reject) => {
    cert = fs.readFileSync("./Key/RefreshToken/publickey.crt");
    jwt.verify(token, cert, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = app;
