import { useEffect, useState } from "react";
import { getJobs } from "../api/jobApi";
import JobForm from "../components/JobForm.jsx";
import JobList from "../components/JobList.jsx";

export default function JobDashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      job.company.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || job.status === filter)
    );
  });

  return (
    <div>
      <div className="header">
        <h1>Job Tracker Dashboard</h1>
      </div>

      <JobForm fetchJobs={fetchJobs} />

      <div className="filters">
        <input
          placeholder="Search Company..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <JobList jobs={filteredJobs} fetchJobs={fetchJobs} />
    </div>
  );
}