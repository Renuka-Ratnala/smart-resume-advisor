function ResultCard({ result }) {
    if (!result) return null;

    const verdictClass =
        result.verdict === "Strong match"
            ? "green"
            : result.verdict === "Average match"
                ? "yellow"
                : "red";

    return (
        <div className="result-card">
            <h2>Result</h2>

            <p>
                <strong>Score:</strong> {result.score}%
            </p>

            <p>
                <strong>Verdict:</strong>{" "}
                <span className={`badge ${verdictClass}`}>
          {result.verdict}
        </span>
            </p>

            <div>
                <strong>Matched Skills:</strong>
                <div className="skill-list">
                    {result.matchedSkills.length > 0
                        ? result.matchedSkills.map((s, i) => (
                            <span key={i} className="skill">{s}</span>
                        ))
                        : " None"}
                </div>
            </div>

            <div>
                <strong>Missing Skills:</strong>
                <div className="skill-list">
                    {result.missingSkills.length > 0
                        ? result.missingSkills.map((s, i) => (
                            <span key={i} className="skill">{s}</span>
                        ))
                        : " None"}
                </div>
            </div>
        </div>
    );
}

export default ResultCard;