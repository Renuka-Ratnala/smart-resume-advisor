import { useState } from "react";
import "../App.css";

function ResumeAnalyzer() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Upload PDF
  const uploadResume = async () => {
    setError("");

    if (!resumeFile) {
      setError("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", resumeFile);

    try {
      const response = await fetch(
        "https://smart-resume-advisor.onrender.com/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

       const text = await response.text();

       setResume(text);

       alert("Resume uploaded successfully!");

    } catch (err) {
      setError("File upload failed.");
    }
  };

  // Analyze Resume
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
        "https://smart-resume-advisor.onrender.com/api/analyze",
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
      setError("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Smart Resume Advisor</h1>

      <div className="form">

        {/* PDF Upload */}
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />

        <button onClick={uploadResume}>
          Upload Resume
        </button>

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

          <p>
            <strong>Score:</strong> {result.score}%
          </p>

          <p>
            <strong>Verdict:</strong> {result.verdict}
          </p>

          <div className="skills">

            <div>
              <h3>Matched Skills</h3>

              <ul>
                {result.matchedSkills.map((skill, index) => (
                  <li key={index} className="good">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Missing Skills</h3>

              <ul>
                {result.missingSkills.map((skill, index) => (
                  <li key={index} className="bad">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;