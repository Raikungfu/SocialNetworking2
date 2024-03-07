const mongoose = require("./Connection");

let Schema = mongoose.Schema;

let AccountSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avt: String,
    age: Date,
    gender: String,
    name: String,
    friendsList: [
      {
        friend: { type: Schema.Types.ObjectId, ref: "account" },
        state: { type: String, default: "pending" },
      },
    ],
    friendsRequest: [{ type: Schema.Types.ObjectId, ref: "account" }],
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
