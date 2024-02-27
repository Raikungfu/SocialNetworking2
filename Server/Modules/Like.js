const mongoose = require('./Connection');

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, required: true, index: true }
});

LikeSchema.index({user: 1, post: 1}, {unique: true})

LikeSchema.statics.addLike = function(userId, postId) {
    return this.findOne({ user: userId, post: postId })
        .then(existingLike => {
            if (existingLike) {
                return existingLike.remove();
            } else {
                return this.create({ user: userId, post: postId });
            }
        })
        .catch(error => {
            console.error("Error adding like:", error);
            throw error;
        });
};

const Like = mongoose.model('Like', LikeSchema)
module.exports = Like