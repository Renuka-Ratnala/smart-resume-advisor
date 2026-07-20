import { FaCloudUploadAlt } from "react-icons/fa";
import CountUp from "react-countup";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
import "../App.css";

function ResumeAnalyzer() {

    const [resume, setResume] = useState("");
    const [job, setJob] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const uploadResume = async () => {

        setError("");

        if (!resumeFile) {
            setError("Please choose a PDF.");
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

        } catch {

            setError("File upload failed.");

        }

    };

    const analyze = async () => {

        setError("");

        setResult(null);
        console.log("Resume:", resume);
        console.log("Job:", job);

        if (!resume.trim() || !job.trim()) {

            setError("Please upload your resume and enter a job description.");

            return;

        }

        setLoading(true);

        try {

            const response = await fetch(
                "https://smart-resume-advisor.onrender.com/api/analyze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded",
                    },

                    body: new URLSearchParams({

                        resumeText: resume,

                        jobText: job,

                    }),

                }
            );

            if (!response.ok) {

                throw new Error();

            }

            const data = await response.json();

            setResult(data);

        } catch {

            setError("Unable to connect to backend.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="dashboard">

            <h1 className="title">

                🚀 Smart Resume Advisor

            </h1>

            <div className="top-section">

                <div className="left-section">

                    {result ? (

                        <>

                            <div className="circle-box">

                                <CircularProgressbar
                                    value={result.score}
                                    text=""
                                    styles={buildStyles({
                                        pathColor: "#6366F1",
                                        trailColor: "#E5E7EB",
                                        strokeLinecap: "round",
                                        pathTransitionDuration: 2,
                                    })}
                                />

                                <div className="score-text">

                                    <CountUp
                                        end={result.score}
                                        duration={2}
                                    />

                                    %

                                </div>

                            </div>

                            <h4 className="ats-title">
                                🏆 ATS SCORE
                            </h4>

                            <h2 className="score-heading">
                                Resume Match Score
                            </h2>

                            <div className="stars">
                                ⭐⭐⭐⭐☆
                            </div>

                            <div className="verdict">
                                {result.verdict}
                            </div>

                            <p className="score-description">
                                Your resume matches approximately{" "}
                                <strong>{result.score}%</strong> of the
                                required job description.
                            </p>

                            <div className="progress-container">

                                <div
                                    className="progress-fill"
                                    style={{ width: `${result.score}%` }}
                                ></div>

                            </div>

                            <p className="progress-text">
                                ATS Match: {result.score}%
                            </p>
                        </>

                    ) : (

                        <div className="waiting">

                            Upload a resume and analyze it to see the score.

                        </div>

                    )}

                </div>

                <div className="right-section">

                    <div className="upload-card">

                        <h2>

                            📄 Upload Resume

                        </h2>

                     <label className="upload-area">

                         <FaCloudUploadAlt className="upload-icon" />

                         <h3>Drag & Drop Resume</h3>

                         <p>or click to browse</p>

                         <small>PDF files only</small>

                         <input
                             type="file"
                             accept=".pdf"
                             onChange={(e) => {
                                 setResumeFile(e.target.files[0]);
                                 setFileName(e.target.files[0]?.name || "");
                             }}
                             hidden
                         />

                     </label>

                        <button

                            onClick={uploadResume}

                        >

                            Upload Resume

                        </button>

                        {fileName && (

                            <div className="resume-status">

                                <h3>

                                    📄 {fileName}

                                </h3>

                                <p className="success">

                                    ✅ Ready for Analysis

                                </p>

                            </div>

                        )}

                        <textarea

                            style={{ display: "none" }}

                            value={resume}

                            onChange={(e) =>

                                setResume(e.target.value)

                            }

                        />

                        <h3>

                            Job Description

                        </h3>

                        <textarea

                            placeholder="Paste Job Description Here..."

                            value={job}

                            onChange={(e) =>

                                setJob(e.target.value)

                            }

                        />

                        <button

                            onClick={analyze}

                            disabled={loading}

                        >

                            {loading

                                ? "Analyzing..."

                                : "🚀 Analyze Resume"}

                        </button>

                        {error && (

                            <p className="error">

                                {error}

                            </p>

                        )}

                    </div>

                </div>

            </div>
            {result && (
            <div className="stats">

                <div className="stat-box">
                    <h3>{result.score}%</h3>
                    <p>ATS Score</p>
                </div>

                <div className="stat-box">
                    <h3>{result.matchedSkills.length}</h3>
                    <p>Matched</p>
                </div>

                <div className="stat-box">
                    <h3>{result.missingSkills.length}</h3>
                    <p>Missing</p>
                </div>

            </div>
            )}
                    {result && (

                        <div className="result-section">

                            <div className="skill-card">

                                <h2>✅ Matched Skills</h2>

                                <ul>

                                    {result.matchedSkills.map((skill, index) => (

                                        <li
                                            key={index}
                                            className="good"
                                        >

                                            {skill}

                                        </li>

                                    ))}

                                </ul>

                            </div>

                            <div className="skill-card">

                                <h2>❌ Missing Skills</h2>

                                <ul>

                                    {result.missingSkills.map((skill, index) => (

                                        <li
                                            key={index}
                                            className="bad"
                                        >

                                            {skill}

                                        </li>

                                    ))}

                                </ul>

                            </div>

                             <div className="skill-card">

                                 <h2>🤖 AI Recommendations</h2>

                                 {result.missingSkills.length > 0 ? (

                                     <>
                                         <ul className="suggestion-list">

                                             {result.missingSkills.map((skill, index) => (

                                                 <li key={index}>

                                                     <span className="tick">✔</span>

                                                     Learn <strong>{skill.toUpperCase()}</strong>

                                                 </li>

                                             ))}

                                             <li>
                                                 <span className="tick">✔</span>
                                                 Add projects using these skills.
                                             </li>

                                             <li>
                                                 <span className="tick">✔</span>
                                                 Mention certifications if available.
                                             </li>

                                             <li>
                                                 <span className="tick">✔</span>
                                                 Include measurable achievements in your resume.
                                             </li>

                                         </ul>

                                         <div className="improvement-box">

                                             <h3>📈 Estimated Improvement</h3>

                                             <strong>
                                                 {result.score}% → {Math.min(result.score + 10, 100)}%
                                             </strong>

                                         </div>

                                     </>

                                 ) : (

                                     <div className="perfect-match">

                                         🎉 Excellent!

                                         <br />

                                         Your resume already covers all required skills.

                                     </div>

                                 )}

                             </div>

                        </div>

                    )}

                </div>

    );

}

export default ResumeAnalyzer;