package com.smartresume.advisor.service;

import java.util.*;

public class SkillNormalizer {

    private static final Map<String, List<String>> SKILL_SYNONYMS = Map.of(
            "java", List.of("java", "core java", "jdk"),
            "spring boot", List.of("spring", "spring boot", "spring mvc"),
            "rest", List.of("rest", "rest api", "restful"),
            "sql", List.of("sql", "mysql", "postgres", "database"),
            "docker", List.of("docker", "container"),
            "aws", List.of("aws", "ec2", "s3", "cloud")
    );

    public static boolean skillPresent(String text, String canonicalSkill) {
        List<String> variants = SKILL_SYNONYMS.get(canonicalSkill);
        if (variants == null) return false;

        for (String variant : variants) {
            if (text.contains(variant)) {
                return true;
            }
        }
        return false;
    }
}
