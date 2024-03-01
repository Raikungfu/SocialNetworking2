const mongoose = require("./Connection");

let Schema = mongoose.Schema;
const PostSchema = new Schema({
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  comment: { type: Number, default: 0 },
  createAt: { type: Date },
  isEdited: { type: Boolean, default: false },
  media: { type: Schema.Types.ObjectId, ref: "Media" },
  author: { type: Schema.Types.ObjectId, require: true, ref: "account" },
  userLike: { type: Schema.Types.ObjectId, ref: "Like" },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
