const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const roomIndividualSchema = new Schema({
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
  sender: [{ type: ObjectId, ref: "account" }],
  lastMessage: String,
  timeStamp: Date,
});

const RoomIndividual = mongoose.model(
  "RoomChatIndividual",
  roomIndividualSchema
);

module.exports = RoomIndividual;
