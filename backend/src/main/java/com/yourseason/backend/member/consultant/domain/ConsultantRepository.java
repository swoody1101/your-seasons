package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.member.common.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {

    Member getByEmail(String email);

    List<Consultant> findByIsActiveTrue();

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    List<Consultant> findTop10ByIsActiveTrueOrderByConsultingCountDesc();
}
