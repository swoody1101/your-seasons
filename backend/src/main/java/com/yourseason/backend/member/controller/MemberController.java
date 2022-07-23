package com.yourseason.backend.member.controller;

import com.yourseason.backend.member.customer.controller.Message;
import com.yourseason.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/validation")
    public ResponseEntity<Message> validateEmail(@RequestParam("email") String email) {
        memberService.validateEmail(email);
        return ResponseEntity.ok()
                .body(new Message("succeeded"));
    }

    @GetMapping("/validation")
    public ResponseEntity<Message> validateNickname(@RequestParam("nickname") String nickname) {
        memberService.validateNickname(nickname);
        return ResponseEntity.ok().
                body(new Message("succeeded"));
    }
}
