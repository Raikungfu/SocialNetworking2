const mongoose = require("./Connection");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, default: null },
  media: { type: Array, default: null },
  isEdited: { type: Boolean, default: false },
  createAt: { type: Date, default: new Date() },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "account" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
