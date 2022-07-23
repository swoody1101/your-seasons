package com.yourseason.backend.member.consultant.controller;

import com.yourseason.backend.member.consultant.controller.dto.ConsultantListResponse;
import com.yourseason.backend.member.consultant.controller.dto.ConsultantResponse;
import com.yourseason.backend.member.consultant.controller.dto.ReviewListResponse;
import com.yourseason.backend.member.consultant.service.ConsultantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/consultants")
public class ConsultantController {

    private final ConsultantService consultantService;

    @GetMapping
    public ResponseEntity<List<ConsultantListResponse>> getConsultants() {
        return ResponseEntity.ok()
                .body(consultantService.getConsultants());
    }

    @GetMapping("/{consultantId}/1")
    public ResponseEntity<ConsultantResponse> getConsultant(@PathVariable Long consultantId) {
        return ResponseEntity.ok()
                .body(consultantService.getConsultant(consultantId));
    }

    @GetMapping("/{consultantId}/2")
    public ResponseEntity<List<ReviewListResponse>> getReviews(@PathVariable Long consultantId) {
        return ResponseEntity.ok()
                .body(consultantService.getReviews(consultantId));
    }
}
