import { useState } from "react";
import { addJob } from "../api/jobApi";

export default function JobForm({ fetchJobs }) {
  const [form, setForm] = useState({ company: "", role: "" });

  const submit = async (e) => {
    e.preventDefault();
    await addJob(form);
    setForm({ company: "", role: "" });
    fetchJobs();
  };

  return (
  <form className="form" onSubmit={submit}>
    <input
      placeholder="Company Name"
      value={form.company}
      onChange={(e) => setForm({ ...form, company: e.target.value })}
    />

    <input
      placeholder="Job Role"
      value={form.role}
      onChange={(e) => setForm({ ...form, role: e.target.value })}
    />

    <button>Add Job</button>
  </form>
);
}