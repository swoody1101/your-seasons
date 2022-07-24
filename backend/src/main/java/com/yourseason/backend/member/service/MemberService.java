package com.yourseason.backend.member.service;

import com.yourseason.backend.common.exception.DuplicationException;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.controller.dto.LoginRequest;
import com.yourseason.backend.member.controller.dto.LoginResponse;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.member.domain.Member;
import com.yourseason.backend.member.domain.Role;
import com.yourseason.backend.member.domain.SecurityMember;
import com.yourseason.backend.member.exception.NotFoundException;
import com.yourseason.backend.member.exception.WrongFormException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService implements UserDetailsService {

    private static final String NOT_FOUND_LOGIN_INFO = "이메일 혹은 패스워드가 입력되지 않았습니다.";
    private static final String NOT_FOUND_USER = "해당 사용자를 찾을 수 없습니다.";
    private static final String EMAIL_DUPLICATED = "이메일이 중복됩니다.";
    private static final String NICKNAME_DUPLICATED = "닉네임이 중복됩니다.";

    private final CustomerRepository customerRepository;
    private final ConsultantRepository consultantRepository;

    public LoginResponse login(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        if (email == null || password == null) {
            throw new WrongFormException(NOT_FOUND_LOGIN_INFO);
        }

        Member loginMember;
        Role role = Role.ROLE_CUSTOMER;
        Member customer = customerRepository.findByEmailAndPassword(email, password);
        Member consultant = consultantRepository.findByEmailAndPassword(email, password);
        if (customer == null && consultant != null) {
            loginMember = consultant;
            role = Role.ROLE_CONSULTANT;
        } else if (customer != null && consultant == null) {
            loginMember = customer;
        } else {
            throw new NotFoundException(NOT_FOUND_USER);
        }
        return LoginResponse.builder()
                .nickname(loginMember.getNickname())
                .imageUrl(loginMember.getImageUrl())
                .role(role)
                .message("succeeded")
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Member> findMember;
        Optional<Member> customer = customerRepository.findByEmail(email);
        Optional<Member> consultant = consultantRepository.findByEmail(email);

        if (customer.isPresent() && !consultant.isPresent()) {
            findMember = customer;
        } else if (!customer.isPresent() && consultant.isPresent()) {
            findMember = consultant;
        } else {
            throw new UsernameNotFoundException("가입되지 않는 email입니다.");
        }
        return new SecurityMember(findMember.get());
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
}
