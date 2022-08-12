package com.yourseason.backend.member.customer.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.customer.controller.dto.*;
import com.yourseason.backend.member.customer.service.CustomerService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<Message> signup(@RequestBody CustomerSignupRequest request) {
        Message message = customerService.createCustomer(request);
        log.info("고객 회원가입 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @GetMapping("/4")
    public ResponseEntity<CustomerResponse> getCustomer(@RequestHeader("Authorization") String token) {
        CustomerResponse response = customerService.getCustomerInfo(JwtUtil.getMemberId(token));
        log.info("고객 마이페이지 - 정보 수정 페이지 조회 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/1")
    public ResponseEntity<List<ReservationListResponse>> getMyReservations(@RequestHeader("Authorization") String token) {
        List<ReservationListResponse> responses = customerService.getMyReservations(JwtUtil.getMemberId(token));
        log.info("고객 마이페이지 - 예약 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @GetMapping("/2")
    public ResponseEntity<List<ConsultingListResponse>> getMyConsultings(@RequestHeader("Authorization") String token) {
        List<ConsultingListResponse> responses = customerService.getMyConsultings(JwtUtil.getMemberId(token));
        log.info("고객 마이페이지 - 지난 진단 기록 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @GetMapping("/3")
    public ResponseEntity<List<ReviewListResponse>> getMyReviews(@RequestHeader("Authorization") String token) {
        List<ReviewListResponse> responses = customerService.getMyReviews(JwtUtil.getMemberId(token));
        log.info("고객 마이페이지 - 리뷰 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @PatchMapping
    public ResponseEntity<Message> updateCustomer(@RequestHeader("Authorization") String token,
                                                  @RequestBody CustomerUpdateRequest customerUpdateRequest) {
        Long customerId = JwtUtil.getMemberId(token);
        Message message = customerService.updateCustomer(customerId, customerUpdateRequest);
        log.info("고객 정보 수정 성공");
        return ResponseEntity.ok()
                .header("Authorization", JwtUtil.generateToken(customerService.getUpdatedCustomer(customerId)))
                .body(message);
    }

    @PatchMapping("/password")
    public ResponseEntity<Message> updateCustomerPassword(@RequestHeader("Authorization") String token,
                                                          @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        Message message = customerService.updateCustomerPassword(JwtUtil.getMemberId(token), passwordUpdateRequest);
        log.info("고객 비밀번호 수정 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @DeleteMapping
    public ResponseEntity<Message> deleteCustomer(@RequestHeader("Authorization") String token) {
        Message message = customerService.deleteCustomer(JwtUtil.getMemberId(token));
        log.info("고객 탈퇴 성공");
        return ResponseEntity.ok()
                .body(message);
    }
}
