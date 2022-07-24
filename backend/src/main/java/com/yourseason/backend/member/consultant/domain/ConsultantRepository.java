package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.member.common.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {

    Member getByEmailAndPassword(String email, String password);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);
}
