const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const Cookies = require("cookies");

const AccountModel = require("../Modules/account");

app.get("/", (req, res, next) => {
  if (req.userData) {
    res.status(200).json(JSON.stringify(req.userData));
  }
});

module.exports = app;
