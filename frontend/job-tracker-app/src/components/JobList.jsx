import { useState } from "react";
import { deleteJob, updateStatus } from "../api/jobApi";

export default function JobList({ jobs, fetchJobs }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    if (!email || !resume) {
      alert("Email and resume required");
      return;
    }

    const formData = new FormData();
    formData.append("userEmail", email);
    formData.append("jobId", selectedJob);
    formData.append("resume", resume);

    try {
      const res = await fetch(
        "http://localhost:5000/api/application/apply",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        alert("Application submitted! Check your email.");
        setSelectedJob(null);
        setEmail("");
        setResume(null);
      } else {
        alert("Application failed.");
      }
    } catch (error) {
      alert("Server error.");
    }
  };

  return (
    <>
      <div className="job-container">
        {jobs.map((job) => (
          <div className="job-card" key={job._id}>
            <h3>{job.company}</h3>
            <p>{job.role}</p>

            <span className={`status ${getStatusClass(job.status)}`}>
              {job.status}
            </span>

            <br />

            <select
              value={job.status}
              onChange={(e) =>
                updateStatus(job._id, e.target.value).then(fetchJobs)
              }
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <br />

            <button
              style={{ backgroundColor: "#10b981", marginTop: "10px" }}
              onClick={() => setSelectedJob(job._id)}
            >
              Apply Now
            </button>

            <br />

            <button
              style={{ marginTop: "10px" }}
              onClick={() => deleteJob(job._id).then(fetchJobs)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* APPLY FORM MODAL */}
      {selectedJob && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <form
            onSubmit={handleApplySubmit}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <h3>Apply for Job</h3>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
            />

            <button type="submit" style={{ backgroundColor: "#2563eb", color: "white" }}>
              Submit Application
            </button>

            <button
              type="button"
              onClick={() => setSelectedJob(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}