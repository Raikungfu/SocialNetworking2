const mongoose = require("./Connection");
const LikePost = require("./LikePost");

let Schema = mongoose.Schema;
const PostSchema = new Schema({
  content: { type: String },
  createAt: { type: Date },
  isEdited: { type: Boolean, default: false },
  media: { type: Array, default: null },
  userId: { type: Schema.Types.ObjectId, require: true, ref: "account" },
  isDelete: { type: Boolean, default: false },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
