import { deleteJob, updateStatus } from "../api/jobApi";

export default function JobList({ jobs, fetchJobs }) {
  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
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

          <button onClick={() => deleteJob(job._id).then(fetchJobs)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}