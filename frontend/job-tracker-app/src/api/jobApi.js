import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/jobs",
});

// 🔐 Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// GET all jobs
export const getJobs = () => API.get("/");

// ADD new job
export const addJob = (jobData) => API.post("/", jobData);

// DELETE job
export const deleteJob = (id) => API.delete(`/${id}`);

// UPDATE status
export const updateStatus = (id, status) =>
  API.put(`/${id}`, { status });