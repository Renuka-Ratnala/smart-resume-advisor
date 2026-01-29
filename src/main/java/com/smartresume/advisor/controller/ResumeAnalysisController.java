package com.smartresume.advisor.controller;

import com.smartresume.advisor.dto.AnalysisResponse;
import com.smartresume.advisor.model.JobDescription;
import com.smartresume.advisor.model.Resume;
import com.smartresume.advisor.service.ResumeAnalyzerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeAnalysisController {

    private final ResumeAnalyzerService resumeAnalyzerService;

    public ResumeAnalysisController(ResumeAnalyzerService resumeAnalyzerService) {
        this.resumeAnalyzerService = resumeAnalyzerService;
    }

    @PostMapping("/analyze")
    public AnalysisResponse analyze(
            @RequestParam("resumeText") String resumeText,
            @RequestParam("jobText") String jobText
    ) {

        Resume resume = new Resume();
        resume.setText(resumeText);

        JobDescription jobDescription = new JobDescription();
        jobDescription.setText(jobText);

        return resumeAnalyzerService.analyze(resume, jobDescription);
    }
}