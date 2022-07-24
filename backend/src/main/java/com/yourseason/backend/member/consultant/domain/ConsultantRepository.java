package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {

    Member findByEmailAndPassword(String email, String password);

    Member findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);
}
