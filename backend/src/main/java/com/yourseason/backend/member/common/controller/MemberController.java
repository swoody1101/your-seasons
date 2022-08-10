package com.yourseason.backend.member.common.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.member.common.controller.dto.EmailAuthRequest;
import com.yourseason.backend.member.common.controller.dto.LoginRequest;
import com.yourseason.backend.member.common.controller.dto.LoginResponse;
import com.yourseason.backend.member.common.service.MemberService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok()
                .header("Authorization", JwtUtil.generateToken(memberService.getMember(loginRequest)))
                .body(memberService.login(loginRequest));
    }

    @GetMapping("/validation/1")
    public ResponseEntity<Message> validateEmail(@RequestParam String email) {
        return ResponseEntity.ok()
                .body(memberService.validateEmail(email));
    }

    @GetMapping("/validation/2")
    public ResponseEntity<Message> validateNickname(@RequestParam String nickname) {
        return ResponseEntity.ok()
                .body(memberService.validateNickname(nickname));
    }

    @GetMapping("/email/1")
    public ResponseEntity<Message> sendEmailValidateToken(@RequestParam String email) {
        return ResponseEntity.ok()
                .body(memberService.sendEmailValidationToken(email));
    }

    @PostMapping("/email/2")
    public ResponseEntity<Message> validateSignUpEmail(@RequestBody EmailAuthRequest emailAuthRequest) {
        return ResponseEntity.ok()
                .body(memberService.validateSignUpEmail(emailAuthRequest));
    }
}
