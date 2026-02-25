const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");

exports.applyJob = async (req, res) => {
  try {
    const { userEmail, jobId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file missing" });
    }

    const application = new Application({
      userEmail,
      jobId,
      resume: req.file.filename,
    });

    await application.save();

    await sendEmail(
      userEmail,
      "Application Submitted",
      "You have successfully applied for the job."
    );

    res.status(200).json({ message: "Application successful" });

  } catch (error) {
    console.error("Apply Error:", error);  // VERY IMPORTANT
    res.status(500).json({ error: error.message });
  }
};