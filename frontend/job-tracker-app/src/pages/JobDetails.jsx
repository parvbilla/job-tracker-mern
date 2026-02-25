import axios from "axios";
import { useState } from "react";

function ApplyForm({ jobId }) {
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userEmail", email);
    formData.append("jobId", jobId);
    formData.append("resume", resume);

    await axios.post(
      "http://localhost:5000/api/application/apply",
      formData
    );

    alert("Applied Successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <button type="submit">Apply Now</button>
    </form>
  );
}

export default ApplyForm;