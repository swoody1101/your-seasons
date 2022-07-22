package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.member.controller.dto.LoginRequestDto;
import com.yourseason.backend.member.controller.dto.LoginResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {
    LoginResponseDto findByEmailAndPassword(LoginRequestDto loginRequestDto);
}
