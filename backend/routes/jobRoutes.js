const express = require("express");
const router = express.Router();
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

module.exports = router;