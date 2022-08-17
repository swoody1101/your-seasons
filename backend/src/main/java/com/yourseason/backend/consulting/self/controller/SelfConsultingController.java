package com.yourseason.backend.consulting.self.controller;

import com.yourseason.backend.consulting.self.controller.dto.SelfConsultingCreateResponse;
import com.yourseason.backend.consulting.self.service.SelfConsultingService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/self-consultings")
public class SelfConsultingController {

    private final SelfConsultingService selfConsultingService;

    @PostMapping
    public ResponseEntity<SelfConsultingCreateResponse> createSelfConsulting(@RequestHeader("Authorization") String token) {
        SelfConsultingCreateResponse response = selfConsultingService.createSelfConsulting(JwtUtil.getMemberId(token));
        log.info("자가 진단 개설 성공");
        return ResponseEntity.ok()
                .body(response);
    }
}
