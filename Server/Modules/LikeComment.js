const mongoose = require("./Connection");

const Schema = mongoose.Schema;

const LikeCommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
    index: true,
  },
});

LikeCommentSchema.index({ user: 1, comment: 1 }, { unique: true });

LikeCommentSchema.statics.addLike = function (userId, commentId) {
  return this.findOne({ user: userId, comment: commentId })
    .then((existingLike) => {
      if (existingLike) {
        return existingLike.remove();
      } else {
        return this.create({ user: userId, comment: commentId });
      }
    })
    .catch((error) => {
      console.error("Error adding like:", error);
      throw error;
    });
};

const LikeComment = mongoose.model("LikeComment", LikeCommentSchema);
module.exports = LikeComment;
