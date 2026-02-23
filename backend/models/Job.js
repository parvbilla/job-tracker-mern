const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Rejected", "Offer"],
    default: "Applied"
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", jobSchema);