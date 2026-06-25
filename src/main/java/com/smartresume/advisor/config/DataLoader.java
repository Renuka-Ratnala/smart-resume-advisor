package com.smartresume.advisor.config;

import com.smartresume.advisor.entity.Skill;
import com.smartresume.advisor.repository.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadSkills(SkillRepository repository) {
        return args -> {

            if (repository.count() == 0) {

                repository.save(new Skill("Java",10));
                repository.save(new Skill("Spring Boot",10));
                repository.save(new Skill("Hibernate",8));
                repository.save(new Skill("JPA",8));
                repository.save(new Skill("SQL",8));
                repository.save(new Skill("MySQL",8));
                repository.save(new Skill("REST API",8));
                repository.save(new Skill("Git",6));
                repository.save(new Skill("GitHub",6));
                repository.save(new Skill("Docker",8));
                repository.save(new Skill("React",8));
                repository.save(new Skill("HTML",5));
                repository.save(new Skill("CSS",5));
                repository.save(new Skill("JavaScript",7));
                repository.save(new Skill("AWS",9));
                repository.save(new Skill("Maven",6));
                repository.save(new Skill("Microservices",10));
                repository.save(new Skill("JUnit",6));
                repository.save(new Skill("Postman",5));
                repository.save(new Skill("DSA",10));

                System.out.println("✅ Skills loaded into database.");
            }
        };
    }
}