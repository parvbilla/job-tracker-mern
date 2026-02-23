import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/jobs"
});

// GET all jobs
export const getJobs = () => API.get("/");

// ADD new job
export const addJob = (data) => API.post("/", data);

// DELETE job
export const deleteJob = (id) => API.delete(`/${id}`);

// UPDATE status
export const updateStatus = (id, status) =>
  API.put(`/${id}`, { status });