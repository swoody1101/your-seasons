package com.yourseason.backend.member.customer.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.customer.controller.dto.*;
import com.yourseason.backend.member.customer.service.CustomerService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<Message> signup(@RequestBody CustomerSignupRequest request) {
        return ResponseEntity.ok()
                .body(customerService.createCustomer(request));
    }

    @GetMapping("/4")
    public ResponseEntity<CustomerResponse> getCustomer(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(customerService.getCustomerInfo(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/1")
    public ResponseEntity<List<ReservationListResponse>> getMyReservations(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(customerService.getMyReservations(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/2")
    public ResponseEntity<List<ConsultingListResponse>> getMyConsultings(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(customerService.getMyConsultings(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/3")
    public ResponseEntity<List<ReviewListResponse>> getMyReviews(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(customerService.getMyReviews(JwtUtil.getMemberId(token)));
    }

    @PatchMapping
    public ResponseEntity<Message> updateCustomer(@RequestHeader("Authorization") String token,
                                                  @RequestBody CustomerUpdateRequest customerUpdateRequest) {
        Long customerId = JwtUtil.getMemberId(token);
        Message message = customerService.updateCustomer(customerId, customerUpdateRequest);
        return ResponseEntity.ok()
                .header("Authorization", JwtUtil.generateToken(customerService.getUpdatedCustomer(customerId)))
                .body(message);
    }

    @PatchMapping("/password")
    public ResponseEntity<Message> updateCustomerPassword(@RequestHeader("Authorization") String token,
                                                          @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        return ResponseEntity.ok()
                .body(customerService.updateCustomerPassword(JwtUtil.getMemberId(token), passwordUpdateRequest));
    }

    @DeleteMapping
    public ResponseEntity<Message> deleteCustomer(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(customerService.deleteCustomer(JwtUtil.getMemberId(token)));
    }
}
