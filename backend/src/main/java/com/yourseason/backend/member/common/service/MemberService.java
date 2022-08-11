package com.yourseason.backend.member.common.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.DuplicationException;
import com.yourseason.backend.common.exception.NotEqualException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongFormException;
import com.yourseason.backend.member.common.controller.dto.EmailAuthRequest;
import com.yourseason.backend.member.common.controller.dto.LoginRequest;
import com.yourseason.backend.member.common.controller.dto.LoginResponse;
import com.yourseason.backend.member.common.domain.Member;
import com.yourseason.backend.member.common.domain.Role;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MemberService {

    private static final char[] TOKEN_COLLECTION = new char[]{
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '!', '@', '#', '$', '%', '^', '&', '*'};
    private static final String NOT_FOUND_LOGIN_INFO = "이메일 혹은 패스워드가 입력되지 않았습니다.";
    private static final String NOT_FOUND_USER = "해당 사용자를 찾을 수 없습니다.";
    private static final String PASSWORD_NOT_EQUAL = "비밀번호가 일치하지 않습니다.";
    private static final String EMAIL_DUPLICATED = "이메일이 중복됩니다.";
    private static final String NICKNAME_DUPLICATED = "닉네임이 중복됩니다.";
    private static final String TOKEN_NOT_EQUAL = "이메일 인증 토큰이 일치하지 않습니다.";
    private static final String MAIL_SUBJECT = "당신의 계절: 회원가입 인증번호 안내";
    private static final String PASSWORD_MAIL_SUBJECT = "당신의 계절: 임시 비밀번호 발급";

    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;
    private final ConsultantRepository consultantRepository;
    private final JavaMailSender javaMailSender;

    public LoginResponse login(LoginRequest loginRequest) {
        Map<String, String> loginMember = getMember(loginRequest);
        return LoginResponse.builder()
                .name(loginMember.get("name"))
                .nickname(loginMember.get("nickname"))
                .birth(LocalDate.parse(loginMember.get("birth"), DateTimeFormatter.ISO_DATE))
                .contact(loginMember.get("contact"))
                .email(loginMember.get("email"))
                .imageUrl(loginMember.get("imageUrl"))
                .role(Role.valueOf(loginMember.get("role")))
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
        if (customer != null && customer.isActive()) {
            checkValidPassword(password, customer.getPassword());
            loginMember = customer;
            member.put("role", String.valueOf(Role.CUSTOMER));
        } else if (consultant != null && consultant.isActive()) {
            checkValidPassword(password, consultant.getPassword());
            loginMember = consultant;
            member.put("role", String.valueOf(Role.CONSULTANT));
        } else {
            throw new NotFoundException(NOT_FOUND_USER);
        }
        member.put("id", String.valueOf(loginMember.getId()));
        member.put("name", loginMember.getName());
        member.put("nickname", loginMember.getNickname());
        member.put("birth", loginMember.getBirth().toString());
        member.put("contact", loginMember.getContact());
        member.put("email", loginMember.getEmail());
        member.put("imageUrl", loginMember.getImageUrl());
        return member;
    }

    public Message sendEmailNewPassword(String email) {
        String newPassword = createAuthToken();
        Member customer = customerRepository.findByEmail(email);
        Member consultant = consultantRepository.getByEmail(email);
        if (customer != null && customer.isActive()) {
            customer.changePassword(passwordEncoder, newPassword);
            customerRepository.save((Customer) customer);
        } else if (consultant != null && consultant.isActive()) {
            consultant.changePassword(passwordEncoder, newPassword);
            consultantRepository.save((Consultant) consultant);
        } else {
            throw new NotFoundException(NOT_FOUND_USER);
        }

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("yourseasons305@naver.com");
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject(PASSWORD_MAIL_SUBJECT);
        simpleMailMessage.setText("임시 비밀번호: " + newPassword
                + "\n임시 비밀번호로 로그인 후 비밀번호를 변경 부탁드립니다.");
        javaMailSender.send(simpleMailMessage);
        return new Message("succeeded");
    }

    public Message sendEmailValidationToken(String email) {
        String emailValidateToken = createAuthToken();
        RedisUtil.setDataExpired(email, emailValidateToken, 60 * 3L);
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("yourseasons305@naver.com");
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject(MAIL_SUBJECT);
        simpleMailMessage.setText("인증번호: " + emailValidateToken
                + "\n해당 인증번호를 인증번호 확인란에 기입하여 주세요.");
        javaMailSender.send(simpleMailMessage);
        return new Message("succeeded");
    }

    public Message validateSignUpEmail(EmailAuthRequest emailAuthRequest) {
        if (!RedisUtil.validateData(emailAuthRequest.getEmail(), emailAuthRequest.getAuthToken())) {
            throw new NotEqualException(TOKEN_NOT_EQUAL);
        }
        return new Message("succeeded");
    }

    private void checkValidPassword(String loginPassword, String password) {
        if (!passwordEncoder.matches(loginPassword, password)) {
            throw new NotEqualException(PASSWORD_NOT_EQUAL);
        }
    }

    private String createAuthToken() {
        StringBuilder token = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            token.append(TOKEN_COLLECTION[(int) (Math.random() * (TOKEN_COLLECTION.length))]);
        }
        return token.toString();
    }
}
