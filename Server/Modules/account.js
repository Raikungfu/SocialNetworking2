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
    friendsRequestSent: [
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
          ref: "RoomChatGroup",
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

// Account.aggregate([
//   { $match: { _id: mongoose.Types.ObjectId(req.user.id) } },
//   {
//     $lookup: {
//       from: "account",
//       localField: "chatIndividual.recipient",
//       foreignField: "_id",
//       as: "recipient",
//     },
//   },
//   {
//     $lookup: {
//       from: "roomchatindividual",
//       localField: "chatIndividual.chatRoomId",
//       foreignField: "_id",
//       as: "chatRoom",
//     },
//   },
//   {
//     $unwind: "$recipient",
//   },
//   {
//     $unwind: "$chatRoom",
//   },
//   {
//     $sort: { "chatRoom.timeStamp": -1 },
//   },
//   {
//     $project: {
//       "chatIndividual.recipient": "$recipient",
//       "chatIndividual.chatRoomId": "$chatRoom",
//     },
//   },
// ])
