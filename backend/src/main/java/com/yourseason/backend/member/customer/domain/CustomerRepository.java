package com.yourseason.backend.member.customer.domain;

import com.yourseason.backend.member.common.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Member findByEmailAndIsActiveTrue(String email);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);
}
