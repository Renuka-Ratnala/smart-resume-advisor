package com.smartresume.advisor.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SkillNormalizer {

    private static final Map<String, List<String>> SKILL_SYNONYMS = new HashMap<>();

    static {

        SKILL_SYNONYMS.put(
                "java",
                List.of("java", "core java", "jdk")
        );

        SKILL_SYNONYMS.put(
                "spring boot",
                List.of("spring", "spring boot", "spring mvc")
        );

        SKILL_SYNONYMS.put(
                "react",
                List.of("react", "reactjs", "react.js")
        );

        SKILL_SYNONYMS.put(
                "mysql",
                List.of("mysql", "sql")
        );

        SKILL_SYNONYMS.put(
                "git",
                List.of("git", "github")
        );

        SKILL_SYNONYMS.put(
                "python",
                List.of("python")
        );

        SKILL_SYNONYMS.put(
                "javascript",
                List.of("javascript", "js")
        );

        SKILL_SYNONYMS.put(
                "mongodb",
                List.of("mongodb", "mongo")
        );

        SKILL_SYNONYMS.put(
                "docker",
                List.of("docker", "container")
        );

        SKILL_SYNONYMS.put(
                "aws",
                List.of("aws", "ec2", "s3", "cloud")
        );

        SKILL_SYNONYMS.put(
                "rest",
                List.of("rest", "rest api", "restful")
        );
    }

    public static boolean skillPresent(String text, String skillFromDb) {

        if (text == null || skillFromDb == null) {
            return false;
        }

        text = text.toLowerCase();
        skillFromDb = skillFromDb.toLowerCase().trim();

        // Direct match
        if (text.contains(skillFromDb)) {
            return true;
        }

        // Synonym match
        List<String> variants = SKILL_SYNONYMS.get(skillFromDb);

        if (variants != null) {
            for (String variant : variants) {
                if (text.contains(variant.toLowerCase())) {
                    return true;
                }
            }
        }

        return false;
    }
}