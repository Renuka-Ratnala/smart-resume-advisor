package com.smartresume.advisor.service;

import com.smartresume.advisor.dto.AnalysisResponse;
import com.smartresume.advisor.entity.AnalysisResult;
import com.smartresume.advisor.entity.Skill;
import com.smartresume.advisor.model.JobDescription;
import com.smartresume.advisor.model.Resume;
import com.smartresume.advisor.repository.AnalysisResultRepository;
import com.smartresume.advisor.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

        String resumeText = resume.getText().toLowerCase();
        String jobText = jobDescription.getText().toLowerCase();

        // 🔥 Fetch skills dynamically from DB
        List<Skill> skills = skillRepository.findAll();

        List<String> matchedSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        int totalScore = 0;
        int maxScore = skills.stream()
                .mapToInt(Skill::getWeight)
                .sum();

        for (Skill skill : skills) {

            String skillName = skill.getName().toLowerCase();
            int weight = skill.getWeight();

            boolean resumeHasSkill =
                    SkillNormalizer.skillPresent(resumeText, skillName);

            boolean jobHasSkill =
                    SkillNormalizer.skillPresent(jobText, skillName);

            if (resumeHasSkill && jobHasSkill) {
                matchedSkills.add(skillName);
                totalScore += weight;
            } else {
                missingSkills.add(skillName);
            }
        }

        int score = maxScore == 0 ? 0 : (totalScore * 100) / maxScore;

        String verdict =
                score >= 70 ? "Strong match" :
                        score >= 40 ? "Average match" :
                                "Weak match";

        // 💾 Save analysis result
        AnalysisResult result = new AnalysisResult();
        result.setResumeText(resume.getText());
        result.setJobText(jobDescription.getText());
        result.setScore(score);
        result.setMatchedSkills(String.join(",", matchedSkills));
        result.setMissingSkills(String.join(",", missingSkills));
        result.setVerdict(verdict);

        analysisResultRepository.save(result);

        return new AnalysisResponse(
                matchedSkills,
                missingSkills,
                score,
                verdict
        );
    }
}