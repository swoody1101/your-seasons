package com.yourseason.backend.member.controller;

import com.yourseason.backend.member.controller.dto.LoginRequestDto;
import com.yourseason.backend.member.controller.dto.LoginResponseDto;
import com.yourseason.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequestDto loginRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        LoginResponseDto responseDto = memberService.getMemberInfo(loginRequestDto);
        if (responseDto != null) {
            resultMap.put("message", "success");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("message", "fail");
            status = HttpStatus.ACCEPTED;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}
