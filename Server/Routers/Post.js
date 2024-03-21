const express = require("express");
const app = express();

const Post = require("../Modules/Post");
const Comment = require("../Modules/Comment");
const Account = require("../Modules/account");
const LikePost = require("../Modules/LikePost");

app.post("/create", function (req, res, next) {
  const data = req.body["formData"];
  const media = req.body["input-file"];
  const user = req.user;
  if (user && (data["post-content"] || media)) {
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
        return;
      })
      .catch((err) => {
        res.status(400).json(err);
        return;
      });
  } else {
    res.status(400).json(new Error("No User Found"));
  }
});

app.get("/dashboard", async function (req, res, next) {
  try {
    var userID = req.user.id;
    const listFriendPost = await Account.findById(userID)
      .select("friendsList.friend")
      .then((data) => {
        return data.friendsList.map((friend) => {
          return friend.friend;
        });
      })
      .catch((err) => {
        throw err;
      });

    listFriendPost.push(userID);
    const docs = await Post.find({ userId: { $in: listFriendPost } })
      .sort([["createAt", "descending"]])
      .skip((req.query.page - 1) * 10 + req.query.numberPosted)
      .limit(10)
      .populate("userId", "username avt name");

    if (docs.length > 0) {
      await Promise.all(
        docs.map(async (items) => {
          likes = await LikePost.findOne({
            post: items._id,
          });
          items._doc["isLiked"] = likes
            ? likes.likeUsers?.includes(userID)
            : false;
          items._doc["likes"] = likes ? likes.likeUsers?.length : 0;

          comments = await Comment.find({
            post: items._id,
          }).countDocuments();
          items._doc["comments"] = comments ? comments : 0;
          return items;
        })
      );
    }

    res.status(200).json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.get("/profile", function (req, res, next) {
  var userID = req.query.id;
  var page = req.query.page;
  Post.find({ userId: userID })
    .sort([["createAt", "descending"]])
    .skip((page - 1) * 10)
    .limit(10)
    .populate("userId", "username avt name")
    .then((docs) => {
      try {
        if (docs.length > 0) {
          return Promise.all(
            docs.map(async (items) => {
              likes = await LikePost.findOne({
                post: items._id,
              });
              items._doc["isLiked"] = likes
                ? likes.likeUsers?.includes(userID)
                : false;
              items._doc["likes"] = likes ? likes.likeUsers?.length : 0;

              comments = await Comment.find({
                post: items._id,
              }).countDocuments();
              items._doc["comments"] = comments ? comments : 0;
              return items;
            })
          );
        } else return docs;
      } catch (err) {
        console.log(err);
      }
    })
    .then((docs) => {
      res.status(200).json(docs);
      return;
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get("/comment", function (req, res, next) {
  const postId = req.query.postId;
  const page = req.query.page;
  Comment.find({ post: postId })
    .skip(page * 5)
    .limit(5)
    .sort([["createAt", "descending"]])
    .populate("author", "username avt name")
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
        return;
      } else res.status(401).json("No comments");
    });
});

app.post("/comment", function (req, res, next) {
  const authorId = req.user.id;
  const postId = req.body.postId;
  const content = req.body.data.content;
  const file = req.body.data["chat-attach-file-input"];
  if (file || content) {
    new Comment({
      text: content,
      media: file,
      author: authorId,
      post: postId,
      createAt: new Date(),
    })
      .save()
      .then((doc) => {
        const data = {
          text: doc.text,
          media: doc.media,
          author: { name: req.user.name, avt: req.user.avt },
          post: doc.postId,
          createAt: doc.createAt,
          isEdited: false,
          id: doc._id,
        };
        res.status(200).json(data);
        return;
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send("Error creating comment");
      });
  }
});

app.get("/like", (req, res) => {
  const postId = req.query.postId;
  try {
    LikePost.addLike(req.user.id, postId).then((data) => {
      res.status(200).json(data ? "like" : "unlike");
      return;
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

app.delete("/:id", function (req, res, next) {});

module.exports = app;
