import { useState } from "react";

function ResumeForm({ onResult }) {
    const [resumeText, setResumeText] = useState("");
    const [jobText, setJobText] = useState("");

    const handleAnalyze = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resumeText,
                    jobText,
                }),
            });

            if (!response.ok) {
                throw new Error("Backend error");
            }

            const data = await response.json();
            console.log("BACKEND RESPONSE:", data); // 🔥 IMPORTANT
            onResult(data);
        } catch (err) {
            console.error("Analyze failed:", err);
        }
    };

    return (
        <div>
      <textarea
          placeholder="Paste Resume Text"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
      />

            <textarea
                placeholder="Paste Job Description"
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
            />

            <button onClick={handleAnalyze}>Analyze Resume</button>
        </div>
    );
}

export default ResumeForm;