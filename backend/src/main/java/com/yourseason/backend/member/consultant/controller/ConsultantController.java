package com.yourseason.backend.member.consultant.controller;

import com.yourseason.backend.member.consultant.controller.dto.ConsultantSignupRequest;
import com.yourseason.backend.member.consultant.controller.dto.ConsultantResponse;
import com.yourseason.backend.member.consultant.service.ConsultantService;
import com.yourseason.backend.common.domain.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/consultants")
public class ConsultantController {

    private final ConsultantService consultantService;

    @PostMapping
    public ResponseEntity<Message> signup(@RequestBody ConsultantSignupRequest consultantSignupRequest) {
        consultantService.createConsultant(consultantSignupRequest);
        return ResponseEntity.created(URI.create("/login"))
                .body(new Message("succeeded"));
    }

    @GetMapping
    public ResponseEntity<List<ConsultantResponse>> getConsultants() {
        return ResponseEntity.ok(consultantService.getConsultants());
    }
}
