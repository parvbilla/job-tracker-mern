const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { applyJob } = require("../controllers/applicationController");

router.post("/apply", upload.single("resume"), applyJob);

module.exports = router;