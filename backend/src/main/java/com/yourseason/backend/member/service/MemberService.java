package com.yourseason.backend.member.service;

import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.controller.dto.LoginRequestDto;
import com.yourseason.backend.member.controller.dto.LoginResponseDto;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private CustomerRepository customerRepository;
    private ConsultantRepository consultantRepository;
    private LoginResponseDto customerDto;
    private LoginResponseDto consultantDto;

    public LoginResponseDto getMemberInfo(LoginRequestDto loginRequestDto) {
        if (loginRequestDto.getEmail() == null || loginRequestDto.getPassword() == null) {
            return null;
        } else {
            customerDto = customerRepository.findByEmailAndPassword(loginRequestDto);
            consultantDto = consultantRepository.findByEmailAndPassword(loginRequestDto);
            if (customerDto != null) {
                return customerDto;
            } else if (consultantDto != null) {
                return consultantDto;
            }
            return null;
        }
    }
}
