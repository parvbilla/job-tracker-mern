const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");

exports.applyJob = async (req, res) => {
  try {
    const { userEmail, jobId } = req.body;

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

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};