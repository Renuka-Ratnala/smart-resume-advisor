function ResultCard({ result }) {
  return (
    <div className="result-card">
      <h2>Result</h2>

      <p><strong>Score:</strong> {result.score}%</p>
      <p><strong>Verdict:</strong> {result.verdict}</p>

      <div className="skills">
        <div>
          <h3>Matched Skills</h3>
          <ul>
            {result.matchedSkills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Missing Skills</h3>
          <ul>
            {result.missingSkills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;