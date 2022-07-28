package com.yourseason.backend.member.customer.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.customer.controller.dto.*;
import com.yourseason.backend.member.customer.service.CustomerService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<Message> signup(@RequestBody CustomerSignupRequest request) {
        customerService.createCustomer(request);
        return ResponseEntity.created(URI.create("/login"))
                .body(new Message("succeeded"));
    }

    @GetMapping("/4")
    public ResponseEntity<CustomerResponse> getCustomer(@RequestHeader("X-Auth-Token") String token) {
        return ResponseEntity.ok()
                .body(customerService.getCustomer(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/1")
    public ResponseEntity<List<ReservationListResponse>> getMyReservations(@RequestHeader("X-Auth-Token") String token) {
        return ResponseEntity.ok()
                .body(customerService.getMyReservations(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/2")
    public ResponseEntity<List<ConsultingListResponse>> getMyConsultings(@RequestHeader("X-Auth-Token") String token) {
        return ResponseEntity.ok()
                .body(customerService.getMyConsultings(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/3")
    public ResponseEntity<List<ReviewListResponse>> getMyReviews(@RequestHeader("X-Auth-Token") String token) {
        return ResponseEntity.ok()
                .body(customerService.getMyReviews(JwtUtil.getMemberId(token)));
    }

    @PatchMapping
    public ResponseEntity<Message> updateCustomer(@RequestHeader("X-Auth-Token") String token,
                                                  @RequestBody CustomerUpdateRequest customerUpdateRequest) {
        return ResponseEntity.ok()
                .body(customerService.updateCustomer(JwtUtil.getMemberId(token), customerUpdateRequest));
    }

    @PatchMapping("/password")
    public ResponseEntity<Message> updateCustomerPassword(@RequestHeader("X-Auth-Token") String token,
                                                          @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        return ResponseEntity.ok()
                .body(customerService.updateCustomerPassword(JwtUtil.getMemberId(token), passwordUpdateRequest));
    }

    @DeleteMapping
    public ResponseEntity<Message> deleteCustomer(@RequestHeader("X-Auth-Token") String token) {
        return ResponseEntity.ok()
                .body(customerService.deleteCustomer(JwtUtil.getMemberId(token)));
    }
}
