const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  company: String,
  role: String,
  status: {
    type: String,
    default: "Applied",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Job", jobSchema);