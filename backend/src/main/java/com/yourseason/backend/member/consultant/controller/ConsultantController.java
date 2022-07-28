package com.yourseason.backend.member.consultant.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.consultant.controller.dto.*;
import com.yourseason.backend.member.consultant.service.ConsultantService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
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
    
    @PostMapping("/closed-days")
    public ResponseEntity<Message> createClosedDay(@RequestHeader("X-Auth-Token") String token,
                                                   @RequestBody LocalDate closedDay) {
        return ResponseEntity.ok()
                .body(consultantService.createClosedDay(JwtUtil.getMemberId(token), closedDay));
    }

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

    @GetMapping("/1")
    public ResponseEntity<ConsultantReservationResponse> getMyReservations(@RequestHeader("X-Auth-Token") String token) {
        return ResponseEntity.ok()
                .body(consultantService.getMyReservations(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/2")
    public ResponseEntity<ConsultantReviewResponse> getMyReviews(@RequestHeader("X-Auth-Token") String token) {
        return ResponseEntity.ok()
                .body(consultantService.getMyReviews(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/3")
    public ResponseEntity<ConsultantInfoResponse> getConsultantInfo(@RequestHeader("X-Auth-Token") String token) {
        return ResponseEntity.ok()
                .body(consultantService.getConsultantInfo(JwtUtil.getMemberId(token)));
    }

    @PatchMapping
    public ResponseEntity<Message> updateConsultant(@RequestHeader("X-Auth-Token") String token,
                                                    @RequestBody ConsultantUpdateRequest consultantUpdateRequest) {
        return ResponseEntity.ok()
                .body(consultantService.updateConsultant(JwtUtil.getMemberId(token), consultantUpdateRequest));
    }

    @PatchMapping("/password")
    public ResponseEntity<Message> updateConsultantPassword(@RequestHeader("X-Auth-Token") String token,
                                                            @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        return ResponseEntity.ok()
                .body(consultantService.updateConsultantPassword(JwtUtil.getMemberId(token), passwordUpdateRequest));
    }

    @DeleteMapping
    public ResponseEntity<Message> deleteConsultant(@RequestHeader("X-Auth-Token") String token) {
        return ResponseEntity.ok()
                .body(consultantService.deleteConsultant(JwtUtil.getMemberId(token)));
    }

    @DeleteMapping("/closed-days/{closedDayId}")
    public ResponseEntity<Message> deleteClosedDay(@RequestHeader("X-Auth-Token") String token,
                                                   @PathVariable Long closedDayId) {
        return ResponseEntity.ok()
                .body(consultantService.deleteClosedDay(JwtUtil.getMemberId(token), closedDayId));
    }
}
