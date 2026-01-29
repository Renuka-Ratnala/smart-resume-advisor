package com.smartresume.advisor.dto;

public class AnalyzeRequest {
    private String resumeText;
    private String jobText;

    public String getResumeText() {
        return resumeText;
    }

    public void setResumeText(String resumeText) {
        this.resumeText = resumeText;
    }

    public String getJobText() {
        return jobText;
    }

    public void setJobText(String jobText) {
        this.jobText = jobText;
    }
}