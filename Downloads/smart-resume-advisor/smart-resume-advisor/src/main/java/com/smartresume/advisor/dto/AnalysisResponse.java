package com.smartresume.advisor.dto;

import java.util.List;

public class AnalysisResponse {

    private List<String> matchedSkills;
    private List<String> missingSkills;
    private int score;
    private String verdict;

    public AnalysisResponse(
            List<String> matchedSkills,
            List<String> missingSkills,
            int score,
            String verdict
    ) {
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.score = score;
        this.verdict = verdict;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public int getScore() {
        return score;
    }

    public String getVerdict() {
        return verdict;
    }
}