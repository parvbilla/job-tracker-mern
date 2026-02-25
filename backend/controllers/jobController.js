const Job = require("../models/Job");


exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all jobs
exports.getJobs = async (req, res) => {
  const jobs = await Job.find().sort({ appliedDate: -1 });
  res.json(jobs);
};

// Add Job
exports.addJob = async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
};

// Delete Job
exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job Removed" });
};

// Update Status
exports.updateStatus = async (req, res) => {
  const job = await Job.findById(req.params.id);
  job.status = req.body.status;
  await job.save();
  res.json(job);
};