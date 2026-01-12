export async function analyzeResume(resumeText, jobText) {
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

    return response.json();
}