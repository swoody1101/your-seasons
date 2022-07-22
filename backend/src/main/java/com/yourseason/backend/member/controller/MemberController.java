package com.yourseason.backend.member.controller;

import com.yourseason.backend.member.exception.DuplicateEmailException;
import com.yourseason.backend.member.exception.DuplicateNicknameException;
import com.yourseason.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/validation")
    public ResponseEntity<HttpStatus> validateEmail(@RequestParam("email") String email) throws DuplicateEmailException {
        if (memberService.validateEmail(email)) {
            throw new DuplicateEmailException();
        }
        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }

    @GetMapping("/validation")
    public ResponseEntity<HttpStatus> validateNickname(@RequestParam("nickname") String nickname) {
        if (memberService.validateNickname(nickname)) {
            throw new DuplicateNicknameException();
        }
        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }
}
