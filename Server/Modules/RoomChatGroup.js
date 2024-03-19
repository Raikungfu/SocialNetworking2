const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const roomChatGroupSchema = new Schema({
  members: [{ type: ObjectId, ref: "Account", required: true }],
  name: { type: String },
  avt: { type: String, default: null },
  messages: [
    {
      sender_id: { type: ObjectId, ref: "account", required: true },
      content: {
        "chat-attach-file-input": { type: Array, default: null, sparse: true },
        content: { type: String, default: null },
      },
      file: { type: Array, default: null, sparse: true },
      isEdited: { type: Boolean, required: true, default: false },
      sent_at: { type: Date, default: Date.now },
      revoke: { type: Boolean, required: true, default: false },
    },
  ],
  lastMessage: String,
  timeStamp: Date,
});

const RoomChatGroup = mongoose.model("RoomChatGroup", roomChatGroupSchema);

module.exports = RoomChatGroup;
