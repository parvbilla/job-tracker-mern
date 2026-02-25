import { useState } from "react";
import Login from "./pages/Login";
import JobDashboard from "./pages/JobDashboard";
import "./styles/dashboard.css";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      {user ? (
        <JobDashboard />
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
}

export default App;