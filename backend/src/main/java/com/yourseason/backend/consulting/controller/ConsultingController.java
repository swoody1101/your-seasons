package com.yourseason.backend.consulting.controller;

import com.yourseason.backend.consulting.controller.dto.ConsultingCreateResponse;
import com.yourseason.backend.consulting.service.ConsultingService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/consultings")
public class ConsultingController {

    private final ConsultingService consultingService;

    @PostMapping
    public ResponseEntity<ConsultingCreateResponse> createConsulting(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(consultingService.createConsulting(JwtUtil.getMemberId(token)));
    }
}
