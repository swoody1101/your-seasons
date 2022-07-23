package com.yourseason.backend.member.customer.domain;

import com.yourseason.backend.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Member getByEmailAndPassword(String email, String password);
}
