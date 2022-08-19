package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.member.common.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {

    Member findByEmailAndIsActiveTrue(String email);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    List<Consultant> findTop10ByIsActiveTrueOrderByConsultingCountDesc();

    List<Consultant> findByIsActiveTrueOrderByIdDesc();

    List<Consultant> findByIsActiveTrueOrderByReviewCountDesc();

    List<Consultant> findByIsActiveTrueOrderByStarAverageDesc();

    List<Consultant> findByIsActiveTrueOrderByCostDesc();

    List<Consultant> findByIsActiveTrueOrderByCost();

    List<Consultant> findByIsActiveTrueOrderByConsultingCountDesc();

    List<Consultant> findByIsActiveTrueAndNicknameContaining(String keyword);
}
