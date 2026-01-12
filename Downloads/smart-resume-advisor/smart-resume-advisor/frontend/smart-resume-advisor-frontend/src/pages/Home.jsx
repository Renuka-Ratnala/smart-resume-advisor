import ResumeForm from "../components/ResumeForm";
import ResultCard from "../components/ResultCard";
import { useState } from "react";

function Home() {
    const [result, setResult] = useState(null);

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h1>Smart Resume Advisor</h1>

            <ResumeForm onResult={setResult} />

            {result && <ResultCard result={result} />}
        </div>
    );
}

export default Home;