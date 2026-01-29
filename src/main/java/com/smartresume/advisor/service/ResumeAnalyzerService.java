package com.smartresume.advisor.service;

import com.smartresume.advisor.dto.AnalysisResponse;
import com.smartresume.advisor.entity.AnalysisResult;
import com.smartresume.advisor.entity.Skill;
import com.smartresume.advisor.model.JobDescription;
import com.smartresume.advisor.model.Resume;
import com.smartresume.advisor.repository.AnalysisResultRepository;
import com.smartresume.advisor.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ResumeAnalyzerService {

    private final AnalysisResultRepository analysisResultRepository;
    private final SkillRepository skillRepository;

    public ResumeAnalyzerService(
            AnalysisResultRepository analysisResultRepository,
            SkillRepository skillRepository
    ) {
        this.analysisResultRepository = analysisResultRepository;
        this.skillRepository = skillRepository;
    }

    public AnalysisResponse analyze(Resume resume, JobDescription jobDescription) {

        if (resume.getText() == null || resume.getText().isBlank()) {
            throw new IllegalArgumentException("Resume text missing");
        }

        if (jobDescription.getText() == null || jobDescription.getText().isBlank()) {
            throw new IllegalArgumentException("Job description text missing");
        }

        String resumeText = resume.getText().toLowerCase();
        String jobText = jobDescription.getText().toLowerCase();

        List<Skill> skills = skillRepository.findAll();

        Set<String> matchedSkills = new HashSet<>();
        Set<String> missingSkills = new HashSet<>();

        int totalScore = 0;
        int maxScore = skills.stream()
                .mapToInt(Skill::getWeight)
                .sum();

        for (Skill skill : skills) {
            String skillName = skill.getName().toLowerCase();

            boolean resumeHas =
                    SkillNormalizer.skillPresent(resumeText, skillName);

            boolean jobHas =
                    SkillNormalizer.skillPresent(jobText, skillName);

            if (resumeHas && jobHas) {
                matchedSkills.add(skillName);
                totalScore += skill.getWeight();
            } else {
                missingSkills.add(skillName);
            }
        }

        int score = maxScore == 0 ? 0 : (totalScore * 100) / maxScore;

        String verdict =
                score >= 70 ? "Strong match" :
                        score >= 40 ? "Average match" :
                                "Weak match";

        // Save to DB
        AnalysisResult result = new AnalysisResult();
        result.setResumeText(resume.getText());
        result.setJobText(jobDescription.getText());
        result.setScore(score);
        result.setMatchedSkills(String.join(",", matchedSkills));
        result.setMissingSkills(String.join(",", missingSkills));
        result.setVerdict(verdict);

        analysisResultRepository.save(result);

        // ✅ THIS NOW MATCHES THE DTO
        return new AnalysisResponse(
                matchedSkills,
                missingSkills,
                score,
                verdict
        );
    }
}