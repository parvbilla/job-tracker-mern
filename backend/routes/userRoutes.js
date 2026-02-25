const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const upload = multer({ dest: "uploads/" });

router.post("/upload-resume", protect, upload.single("resume"), async (req, res) => {
  const user = await User.findById(req.user.id);
  user.resume = req.file.path;
  await user.save();
  res.json({ message: "Resume uploaded" });
});

module.exports = router;