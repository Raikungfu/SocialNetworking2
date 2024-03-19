const mongoose = require("./Connection");

const Schema = mongoose.Schema;

const LikePostSchema = new Schema({
  likeUsers: { type: [Schema.Types.ObjectId], ref: "User" },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    index: true,
  },
});

LikePostSchema.index({ user: 1, post: 1 }, { unique: true });

LikePostSchema.statics.addLike = function (userId, postId) {
  return this.findOne({ post: postId })
    .then((data) => {
      if (data) {
        const existLike = data.likeUsers && data.likeUsers.includes(userId);
        const query = existLike
          ? { $pull: { likeUsers: userId } }
          : { $addToSet: { likeUsers: userId } };
        this.updateOne({ _id: data._id }, query).exec();
        return !existLike;
      } else {
        this.create({ post: postId, likeUsers: [userId] });
        return true;
      }
    })
    .catch((error) => {
      console.error("Error adding like:", error);
      throw error;
    });
};

const LikePost = mongoose.model("Like", LikePostSchema);
module.exports = LikePost;
