const mongoose = require("./Connection");

const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  users: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "account", required: true },
      offer: {
        type: { type: String },
        sdp: { type: String },
      },
      answer: {
        type: { type: String },
        sdp: { type: String },
      },
    },
  ],
});

const Meeting = mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;
