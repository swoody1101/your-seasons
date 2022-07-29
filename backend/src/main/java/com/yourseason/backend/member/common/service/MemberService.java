package com.yourseason.backend.member.common.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.DuplicationException;
import com.yourseason.backend.common.exception.NotEqualException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongFormException;
import com.yourseason.backend.member.common.controller.dto.LoginRequest;
import com.yourseason.backend.member.common.controller.dto.LoginResponse;
import com.yourseason.backend.member.common.domain.Member;
import com.yourseason.backend.member.common.domain.Role;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MemberService {

    private static final String NOT_FOUND_LOGIN_INFO = "이메일 혹은 패스워드가 입력되지 않았습니다.";
    private static final String NOT_FOUND_USER = "해당 사용자를 찾을 수 없습니다.";
    private static final String PASSWORD_NOT_EQUAL = "비밀번호가 일치하지 않습니다.";
    private static final String EMAIL_DUPLICATED = "이메일이 중복됩니다.";
    private static final String NICKNAME_DUPLICATED = "닉네임이 중복됩니다.";

    private final PasswordEncoder passwordEncoder;
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

    public Message validateEmail(String email) {
        if (customerRepository.existsByEmail(email) || consultantRepository.existsByEmail(email)) {
            throw new DuplicationException(EMAIL_DUPLICATED);
        }
        return new Message("succeeded");
    }

    public Message validateNickname(String nickname) {
        if (customerRepository.existsByNickname(nickname) || consultantRepository.existsByNickname(nickname)) {
            throw new DuplicationException(NICKNAME_DUPLICATED);
        }
        return new Message("succeeded");
    }

    public Map<String, String> getMember(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        if (email == null || password == null) {
            throw new WrongFormException(NOT_FOUND_LOGIN_INFO);
        }

        Map<String, String> member = new HashMap<>();
        Member loginMember;
        Member customer = customerRepository.findByEmail(email);
        Member consultant = consultantRepository.getByEmail(email);
        if (customer != null && consultant == null) {
            checkValidPassword(password, customer.getPassword());
            loginMember = customer;
            member.put("role", String.valueOf(Role.CUSTOMER));
        } else if (consultant != null && customer == null) {
            checkValidPassword(password, consultant.getPassword());
            loginMember = consultant;
            member.put("role", String.valueOf(Role.CONSULTANT));
        } else {
            throw new NotFoundException(NOT_FOUND_USER);
        }
        member.put("id", String.valueOf(loginMember.getId()));
        member.put("nickname", loginMember.getNickname());
        member.put("imageUrl", loginMember.getImageUrl());
        return member;
    }

    private void checkValidPassword(String loginPassword, String password) {
        if (!passwordEncoder.matches(loginPassword, password)) {
            throw new NotEqualException(PASSWORD_NOT_EQUAL);
        }
    }
}
