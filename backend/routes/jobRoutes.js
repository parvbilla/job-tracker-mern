const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");
const {
  getJobs,
  addJob,
  deleteJob,
  updateStatus
} = require("../controllers/jobController");

router.get("/", getJobs);
router.post("/", addJob);
router.delete("/:id", deleteJob);
router.put("/:id", updateStatus);
router.post("/", protect, createJob);

module.exports = router;