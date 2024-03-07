const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const roomChatSchema = new Schema({
  members: [{ type: ObjectId, ref: "Account", required: true }],
});

const RoomChat = mongoose.model("RoomChat", roomChatSchema);

module.exports = RoomChat;
