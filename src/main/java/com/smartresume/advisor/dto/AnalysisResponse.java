package com.smartresume.advisor.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class AnalysisResponse {

    private Set<String> matchedSkills = new HashSet<>();
    private Set<String> missingSkills = new HashSet<>();
    private int score;
    private String verdict;

    public AnalysisResponse() {
    }

    public AnalysisResponse(
            Set<String> matchedSkills,
            Set<String> missingSkills,
            int score,
            String verdict
    ) {
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.score = score;
        this.verdict = verdict;
    }

    // ---- GETTERS (return List for frontend) ----

    public List<String> getMatchedSkills() {
        return new ArrayList<>(matchedSkills);
    }

    public List<String> getMissingSkills() {
        return new ArrayList<>(missingSkills);
    }

    public int getScore() {
        return score;
    }

    public String getVerdict() {
        return verdict;
    }

    // ---- SETTERS (accept List, convert to Set) ----

    public void setMatchedSkills(List<String> matchedSkills) {
        this.matchedSkills = new HashSet<>(matchedSkills);
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = new HashSet<>(missingSkills);
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setVerdict(String verdict) {
        this.verdict = verdict;
    }
}