const mongoose = require("./Connection");

let Schema = mongoose.Schema;

let AccountSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avt: String,
    cover: String,
    age: Date,
    gender: String,
    name: String,
    friendsList: [
      {
        friend: { type: Schema.Types.ObjectId, ref: "account", unique: true },
        state: { type: String, default: "pending" },
      },
    ],
    friendsRequest: [
      { type: Schema.Types.ObjectId, ref: "account", unique: true },
    ],
    chatIndividual: [
      {
        recipient: {
          type: Schema.Types.ObjectId,
          ref: "account",
          required: true,
          unique: true,
        },
        chatRoomId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "RoomChatIndividual",
          unique: true,
        },
      },
    ],
    chatGroup: [
      {
        chatRoomId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "RoomChat",
          unique: true,
        },
      },
    ],
  },
  {
    collection: "account",
  }
);

AccountSchema.path("friendsList").validate(function (value) {
  const ids = new Set(value.map((friend) => friend.friend));
  return value.length === ids.size;
}, "Duplicate friends in friendsList");

AccountSchema.path("friendsRequest").validate(function (value) {
  return new Set(value).size === value.length;
}, "Duplicate friends in friendsRequest");

const Account = mongoose.model("account", AccountSchema);

module.exports = Account;
