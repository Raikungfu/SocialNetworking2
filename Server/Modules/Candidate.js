const mongoose = require("./Connection");

const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "account" },
  roomId: { type: Schema.Types.ObjectId, ref: "Meeting" },
  candidate: [
    {
      candidate: String,
      sdpMid: String,
      sdpMLineIndex: Number,
      usernameFragment: String,
    },
  ],
});

const Candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = Candidate;
