import { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setError("");
    setResult(null);

    if (!resume.trim() || !job.trim()) {
      setError("Please enter both Resume and Job Description.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            resumeText: resume,
            jobText: job,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to connect to backend. Is Spring Boot running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Smart Resume Advisor</h1>

      <div className="form">
        <textarea
          placeholder="Paste your resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <textarea
          placeholder="Paste job description here..."
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />

        <button onClick={analyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {result && (
        <div className="result">
          <h2>Result</h2>
          <p><strong>Score:</strong> {result.score}%</p>
          <p><strong>Verdict:</strong> {result.verdict}</p>

          <div className="skills">
            <div>
              <h3>Matched Skills</h3>
              <ul>
                {result.matchedSkills.map((s, i) => (
                  <li key={i} className="good">{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Missing Skills</h3>
              <ul>
                {result.missingSkills.map((s, i) => (
                  <li key={i} className="bad">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;