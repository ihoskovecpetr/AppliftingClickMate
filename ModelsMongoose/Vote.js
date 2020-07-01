const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  teamId: { type: String },
  sessionString: { type: String },
  clicks: { type: Number },
});

module.exports = mongoose.models.Vote || mongoose.model("Vote", VoteSchema);
