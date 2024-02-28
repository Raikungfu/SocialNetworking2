const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const Cookies = require("cookies");

const Post = require("../../Modules/Post");

app.use(function (req, res, next) {
  next();
});

app.get("/", function (req, res, next) {});

app.post("/", function (req, res, next) {
  return res.status(200).json("sss");
});

app.delete("/:id", function (req, res, next) {});

module.exports = app;
