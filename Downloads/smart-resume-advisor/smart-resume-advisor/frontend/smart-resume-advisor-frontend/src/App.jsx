import ResumeForm from "./components/ResumeForm";
import ResultCard from "./components/ResultCard";
import { useState } from "react";

function App() {
    const [result, setResult] = useState(null);

    return (
        <div className="container">
            <h1>Smart Resume Advisor</h1>
            <ResumeForm onResult={setResult} />
            {result && <ResultCard result={result} />}
        </div>
    );
}

export default App;