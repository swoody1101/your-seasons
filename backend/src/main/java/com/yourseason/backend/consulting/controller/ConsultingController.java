package com.yourseason.backend.consulting.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.consulting.controller.dto.ConsultingCreateResponse;
import com.yourseason.backend.consulting.controller.dto.ConsultingFinishRequest;
import com.yourseason.backend.consulting.controller.dto.ConsultingJoinResponse;
import com.yourseason.backend.consulting.controller.dto.ConsultingRequest;
import com.yourseason.backend.consulting.service.ConsultingService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/consultings")
public class ConsultingController {

    private final ConsultingService consultingService;

    @PostMapping
    public ResponseEntity<ConsultingCreateResponse> createConsulting(@RequestHeader("Authorization") String token, @RequestBody ConsultingRequest consultingRequest) {
        ConsultingCreateResponse response = consultingService.createConsulting(JwtUtil.getMemberId(token), consultingRequest);
        log.info("컨설팅 개설 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @PostMapping("/join")
    public ResponseEntity<ConsultingJoinResponse> joinConsulting(@RequestHeader("Authorization") String token, @RequestBody ConsultingRequest consultingRequest) {
        ConsultingJoinResponse response = consultingService.joinConsulting(JwtUtil.getMemberId(token), consultingRequest);
        log.info("컨설팅 입장 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @PostMapping("/1")
    public ResponseEntity<Message> finishConsulting(@RequestHeader("Authorization") String token,
                                                    @RequestPart ConsultingFinishRequest consultingFinishRequest,
                                                    @RequestPart("file") MultipartFile multipartFile) {
        Message message = consultingService.finishConsulting(JwtUtil.getMemberId(token), consultingFinishRequest, multipartFile);
        log.info("컨설팅 종료 후 진단 결과 저장 성공");
        return ResponseEntity.ok()
                .body(message);
    }
}
