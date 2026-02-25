const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userEmail: String,
  jobId: String,
  resume: String,
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);