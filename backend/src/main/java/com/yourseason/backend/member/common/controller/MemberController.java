package com.yourseason.backend.member.common.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.member.common.controller.dto.EmailAuthRequest;
import com.yourseason.backend.member.common.controller.dto.LoginRequest;
import com.yourseason.backend.member.common.controller.dto.LoginResponse;
import com.yourseason.backend.member.common.service.MemberService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = memberService.login(loginRequest);
        log.info("로그인 성공");
        return ResponseEntity.ok()
                .header("Authorization", JwtUtil.generateToken(memberService.getMember(loginRequest)))
                .body(response);
    }

    @GetMapping("/validation/1")
    public ResponseEntity<Message> validateEmail(@RequestParam String email) {
        Message message = memberService.validateEmail(email);
        log.info("이메일 유효성 검사 - 사용 가능한 이메일");
        return ResponseEntity.ok()
                .body(message);
    }

    @GetMapping("/validation/2")
    public ResponseEntity<Message> validateNickname(@RequestParam String nickname) {
        Message message = memberService.validateNickname(nickname);
        log.info("닉네임 유효성 검사 - 사용 가능한 닉네임");
        return ResponseEntity.ok()
                .body(message);
    }

    @GetMapping("/email/1")
    public ResponseEntity<Message> sendEmailValidationToken(@RequestParam String email) {
        Message message = memberService.sendEmailValidationToken(email);
        log.info("이메일 인증 메일 보내기 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @PostMapping("/email/2")
    public ResponseEntity<Message> validateSignUpEmail(@RequestBody EmailAuthRequest emailAuthRequest) {
        Message message = memberService.validateSignUpEmail(emailAuthRequest);
        log.info("이메일 인증 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @GetMapping("/email/3")
    public ResponseEntity<Message> sendEmailNewPassword(@RequestParam String email) {
        Message message = memberService.sendEmailNewPassword(email);
        log.info("새로운 비밀번호 이메일로 발급 성공");
        return ResponseEntity.ok()
                .body(message);
    }
}
