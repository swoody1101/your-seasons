package com.yourseason.backend.member.common.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long> {

    EmailAuth findByEmail(String email);

    boolean existsByEmailAndAuthToken(String email, String authToken);
}
