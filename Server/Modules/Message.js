const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
  room_id: { type: ObjectId, ref: "RoomChat", required: true },
  sender_id: { type: ObjectId, ref: "account", required: true },
  content: { type: String, required: true },
  isEdited: { type: Boolean, required: true, default: false },
  sent_at: { type: Date, default: Date.now },
  revoke: { type: Boolean, required: true, default: false },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
