package com.yourseason.backend.member.consultant.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {

    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
}
