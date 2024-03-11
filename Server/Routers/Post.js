const express = require("express");
const app = express();

const Post = require("../Modules/Post");

app.post("/create", function (req, res, next) {
  const data = req.body["formData"];
  const media = req.body["input-file"];
  const user = req.user;
  if (user && (data["post-content"] || media)) {
    console.log(data);
    new Post({
      userId: user.id,
      content: data["post-content"],
      createAt: new Date(),
      media: media,
    })
      .save()
      .then((createdPost) => {
        createdPost.userId = user;
        res.status(200).json(createdPost);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  } else {
    res.status(404).json(new Error("No User Found"));
  }
});

app.get("/", function (req, res, next) {
  var userID = req.user.id;
  Post.find({ userId: userID })
    .sort([["createAt", "descending"]])
    .skip((req.query.page - 1) * 10 + req.query.numberPosted)
    .limit(10)
    .populate("userId", "username avt name")
    .then((docs) => {
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else throw new Error("Not found");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.delete("/:id", function (req, res, next) {});

module.exports = app;
