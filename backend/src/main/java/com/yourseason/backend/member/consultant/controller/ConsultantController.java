package com.yourseason.backend.member.consultant.controller;

import com.yourseason.backend.member.consultant.controller.dto.ConsultantResponse;
import com.yourseason.backend.member.consultant.service.ConsultantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/consultants")
public class ConsultantController {

    private final ConsultantService consultantService;

    @GetMapping
    public ResponseEntity<List<ConsultantResponse>> getConsultants() {
        return ResponseEntity.ok(consultantService.getConsultants());
    }
}
