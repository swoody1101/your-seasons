package com.yourseason.backend.consulting.self.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.consulting.self.controller.dto.SelfConsultingFinishRequest;
import com.yourseason.backend.consulting.self.service.SelfConsultingService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/self-consultings")
public class SelfConsultingController {

    private final SelfConsultingService selfConsultingService;

    @PostMapping()
    public ResponseEntity<Message> finishSelfConsulting(@RequestHeader("Authorization") String token,
                                                        @RequestBody SelfConsultingFinishRequest selfConsultingFinishRequest) {
        Message message = selfConsultingService.finishSelfConsulting(JwtUtil.getMemberId(token), selfConsultingFinishRequest);
        log.info("자가 진단 종료 후 진단 결과 저장 성공");
        return ResponseEntity.ok()
                .body(message);
    }
}
