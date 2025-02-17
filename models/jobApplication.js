const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobTitle: String,
  company: String,
  jobUrl: String,
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
