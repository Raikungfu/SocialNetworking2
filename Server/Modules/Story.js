const mongoose = require('./Connection');

const Schema = mongoose.Schema;

const StorySchema = new Schema({
    fileID: {type: Schema.Types.ObjectId, ref: 'File'},
    likes: { type: Number, default: 0 },
    likeID: { type: Schema.Types.ObjectId, ref: 'Like'},
    shares: { type: Number, default: 0 },
    shareID: { type: Schema.Types.ObjectId, ref: 'Share'},
    comment: { type: Number, default: 0 },
    commentID: { type: Schema.Types.ObjectId, ref: 'Comment'},
    createAt: { type: Date},
    isEdited: { type: Boolean, default: false},
    authorId: { type: Schema.Types.ObjectId, ref: 'account'}
});

const Story = mongoose.model("Story", StorySchema);

module.exports = Story
