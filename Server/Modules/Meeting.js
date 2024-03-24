const mongoose = require("./Connection");

const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  offer: {
    type: { type: String, required: true },
    sdp: { type: String, required: true },
  },
});

const Meeting = mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;
