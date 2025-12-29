package com.smartresume.advisor.repository;

import com.smartresume.advisor.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}