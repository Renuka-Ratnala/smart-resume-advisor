package com.smartresume.advisor.entity;

import jakarta.persistence.*;

@Entity
public class AnalysisResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String resumeText;

    @Column(columnDefinition = "TEXT")
    private String jobText;

    private int score;

    @Column(columnDefinition = "TEXT")
    private String matchedSkills;

    @Column(columnDefinition = "TEXT")
    private String missingSkills;

    private String verdict;

    public void setResumeText(String resumeText) {
        this.resumeText = resumeText;
    }

    public void setJobText(String jobText) {
        this.jobText = jobText;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setMatchedSkills(String matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public void setMissingSkills(String missingSkills) {
        this.missingSkills = missingSkills;
    }

    public void setVerdict(String verdict) {
        this.verdict = verdict;
    }
}