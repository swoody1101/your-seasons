package com.yourseason.backend.member.customer.domain;

import com.yourseason.backend.member.controller.dto.LoginRequestDto;
import com.yourseason.backend.member.controller.dto.LoginResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    LoginResponseDto findByEmailAndPassword(LoginRequestDto loginRequestDto);
}
