const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String },
  urlName: { type: String },
  clicks: { type: Number },
});

module.exports = mongoose.models.Team || mongoose.model("Team", TeamSchema);
