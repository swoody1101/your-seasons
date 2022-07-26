package com.yourseason.backend.member.common.service;

import com.yourseason.backend.common.exception.DuplicationException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongFormException;
import com.yourseason.backend.member.common.controller.dto.LoginRequest;
import com.yourseason.backend.member.common.controller.dto.LoginResponse;
import com.yourseason.backend.member.common.domain.Member;
import com.yourseason.backend.member.common.domain.Role;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MemberService {

    private static final String NOT_FOUND_LOGIN_INFO = "이메일 혹은 패스워드가 입력되지 않았습니다.";
    private static final String NOT_FOUND_USER = "해당 사용자를 찾을 수 없습니다.";
    private static final String EMAIL_DUPLICATED = "이메일이 중복됩니다.";
    private static final String NICKNAME_DUPLICATED = "닉네임이 중복됩니다.";

    private final CustomerRepository customerRepository;
    private final ConsultantRepository consultantRepository;

    public LoginResponse login(LoginRequest loginRequest) {
        Map<String, String> loginMember = getMember(loginRequest);
        return LoginResponse.builder()
                .nickname(loginMember.get("nickname"))
                .imageUrl(loginMember.get("imageUrl"))
                .role(Role.valueOf(loginMember.get("role")))
                .message("succeeded")
                .build();
    }

    public void validateEmail(String email) {
        if (customerRepository.existsByEmail(email) || consultantRepository.existsByEmail(email)) {
            throw new DuplicationException(EMAIL_DUPLICATED);
        }
    }

    public void validateNickname(String nickname) {
        if (customerRepository.existsByNickname(nickname) || consultantRepository.existsByNickname(nickname)) {
            throw new DuplicationException(NICKNAME_DUPLICATED);
        }
    }

    public Map<String, String> getMember(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        if (email == null || password == null) {
            throw new WrongFormException(NOT_FOUND_LOGIN_INFO);
        }

        HashMap<String, String> member = new HashMap<>();
        Member loginMember;
        Member customer = customerRepository.findByEmailAndPassword(email, password);
        Member consultant = consultantRepository.getByEmailAndPassword(email, password);
        if (customer != null && consultant == null) {
            loginMember = customer;
            member.put("role", String.valueOf(Role.CONSULTANT));
        } else if (consultant != null && customer == null) {
            loginMember = consultant;
            member.put("role", String.valueOf(Role.CUSTOMER));
        } else {
            throw new NotFoundException(NOT_FOUND_USER);
        }
        member.put("id", String.valueOf(loginMember.getId()));
        member.put("nickname", loginMember.getNickname());
        member.put("imageUrl", loginMember.getImageUrl());
        return member;
    }
}
