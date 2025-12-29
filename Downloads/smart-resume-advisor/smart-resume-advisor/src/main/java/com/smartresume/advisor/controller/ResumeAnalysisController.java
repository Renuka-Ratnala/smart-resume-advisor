package com.smartresume.advisor.controller;

import com.smartresume.advisor.dto.AnalyzeRequest;
import com.smartresume.advisor.dto.AnalysisResponse;
import com.smartresume.advisor.model.JobDescription;
import com.smartresume.advisor.model.Resume;
import com.smartresume.advisor.service.ResumeAnalyzerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ResumeAnalysisController {

    private final ResumeAnalyzerService resumeAnalyzerService;

    public ResumeAnalysisController(ResumeAnalyzerService resumeAnalyzerService) {
        this.resumeAnalyzerService = resumeAnalyzerService;
    }

    @PostMapping("/analyze")
    public AnalysisResponse analyze(@RequestBody AnalyzeRequest request) {

        Resume resume = new Resume();
        resume.setText(request.getResumeText());

        JobDescription jobDescription = new JobDescription();
        jobDescription.setText(request.getJobText());

        return resumeAnalyzerService.analyze(resume, jobDescription);
    }
}