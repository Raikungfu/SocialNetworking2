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
  checkJWTRefresh(refreshToken)
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

module.exports = app;
