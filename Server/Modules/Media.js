const mongoose = require("./Connection");

var Schema = mongoose.Schema;

const MediaSchema = new Schema(
  {
    type: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    collection: "Media",
  }
);

const Media = mongoose.model("Media", MediaSchema);
module.exports = Media;
