package com.yourseason.backend.member.consultant.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.consultant.controller.dto.*;
import com.yourseason.backend.member.consultant.service.ConsultantService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/consultants")
public class ConsultantController {

    private final ConsultantService consultantService;

    @PostMapping
    public ResponseEntity<Message> signup(@RequestBody ConsultantSignupRequest consultantSignupRequest) {
        Message message = consultantService.createConsultant(consultantSignupRequest);
        log.info("컨설턴트 회원가입 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @PostMapping("/closed-days")
    public ResponseEntity<Message> createClosedDay(@RequestHeader("Authorization") String token,
                                                   @RequestBody ClosedDayRequest closedDayRequest) {
        Message message = consultantService.createClosedDay(JwtUtil.getMemberId(token), closedDayRequest);
        log.info("컨설턴트 휴무일 등록 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @GetMapping
    public ResponseEntity<List<ConsultantListResponse>> getConsultants(@RequestParam String order) {
        List<ConsultantListResponse> responses = consultantService.getConsultants(order);
        log.info("컨설턴트 목록 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ConsultantListResponse>> searchConsultantByNickname(@RequestParam String keyword) {
        List<ConsultantListResponse> responses = consultantService.searchConsultantByNickname(keyword);
        log.info("컨설턴트 닉네임 검색 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @GetMapping("/top10")
    public ResponseEntity<List<ConsultantListResponse>> getTop10Consultants() {
        List<ConsultantListResponse> responses = consultantService.getTop10Consultants();
        log.info("컨설턴트 인기 상위 10명 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @GetMapping("/{consultantId}/1")
    public ResponseEntity<ConsultantResponse> getConsultant(@PathVariable Long consultantId) {
        ConsultantResponse response = consultantService.getConsultantDetail(consultantId);
        log.info("컨설턴트 상세 - 예약 조회 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/{consultantId}/2")
    public ResponseEntity<List<ReviewListResponse>> getReviews(@PathVariable Long consultantId) {
        List<ReviewListResponse> responses = consultantService.getReviews(consultantId);
        log.info("컨설턴트 상세 - 리뷰 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @GetMapping("/1")
    public ResponseEntity<ConsultantReservationResponse> getMyReservations(@RequestHeader("Authorization") String token) {
        ConsultantReservationResponse response = consultantService.getMyReservations(JwtUtil.getMemberId(token));
        log.info("컨설턴트 마이페이지 - 예약 조회 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/2")
    public ResponseEntity<ConsultantReviewResponse> getMyReviews(@RequestHeader("Authorization") String token) {
        ConsultantReviewResponse response = consultantService.getMyReviews(JwtUtil.getMemberId(token));
        log.info("컨설턴트 마이페이지 - 리뷰 조회 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/3")
    public ResponseEntity<ConsultantInfoResponse> getConsultantInfo(@RequestHeader("Authorization") String token) {
        ConsultantInfoResponse response = consultantService.getConsultantInfo(JwtUtil.getMemberId(token));
        log.info("컨설턴트 마이페이지 - 정보 수정 페이지 조회 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @PatchMapping
    public ResponseEntity<Message> updateConsultant(@RequestHeader("Authorization") String token,
                                                    @RequestBody ConsultantUpdateRequest consultantUpdateRequest) {
        Long consultantId = JwtUtil.getMemberId(token);
        Message message = consultantService.updateConsultant(consultantId, consultantUpdateRequest);
        log.info("컨설턴트 정보 수정 성공");
        return ResponseEntity.ok()
                .header("Authorization", JwtUtil.generateToken(consultantService.getUpdatedConsultant(consultantId)))
                .body(message);
    }

    @PatchMapping("/password")
    public ResponseEntity<Message> updateConsultantPassword(@RequestHeader("Authorization") String token,
                                                            @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        Message message = consultantService.updateConsultantPassword(JwtUtil.getMemberId(token), passwordUpdateRequest);
        log.info("컨설턴트 비밀번호 수정 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @DeleteMapping
    public ResponseEntity<Message> deleteConsultant(@RequestHeader("Authorization") String token) {
        Message message = consultantService.deleteConsultant(JwtUtil.getMemberId(token));
        log.info("컨설턴트 탈퇴 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @DeleteMapping("/closed-days/{closedDayId}")
    public ResponseEntity<Message> deleteClosedDay(@RequestHeader("Authorization") String token,
                                                   @PathVariable Long closedDayId) {
        Message message = consultantService.deleteClosedDay(JwtUtil.getMemberId(token), closedDayId);
        log.info("컨설턴트 휴무일 삭제 성공");
        return ResponseEntity.ok()
                .body(message);
    }
}
