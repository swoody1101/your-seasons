package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.member.common.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {

    Member getByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    List<Consultant> findAllByIsActiveTrueOrderByIdDesc();

    List<Consultant> findAllByIsActiveTrueOrderByReviewCountDesc();

    List<Consultant> findAllByIsActiveTrueOrderByStarAverageDesc();

    List<Consultant> findAllByIsActiveTrueOrderByCostDesc();

    List<Consultant> findAllByIsActiveTrueOrderByCost();

    @Query(value = "SELECT * FROM consultant as consultant " +
                     "LEFT JOIN (SELECT consultant_id, count(*) as count " +
                                  "FROM consulting " +
                                 "GROUP BY consultant_id) as consulting " +
                       "ON consultant.consultant_id = consulting.consultant_id " +
                    "ORDER BY consulting.count desc"
                   , nativeQuery = true)
    List<Consultant> findAllByIsActiveTrueOrderByConsultingCountDesc();

    List<Consultant> findByIsActiveTrueAndNicknameContaining(String keyword);
}
