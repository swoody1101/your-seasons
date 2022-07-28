package com.yourseason.backend.member.customer.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.customer.controller.dto.*;
import com.yourseason.backend.member.customer.service.CustomerService;
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

    @GetMapping
    public ResponseEntity<CustomerResponse> getCustomer() {
        return ResponseEntity.ok()
                .body(customerService.getCustomer(0L));
    }
    @GetMapping("/1")
    public ResponseEntity<List<ReservationListResponse>> getMyReservations() {
        return ResponseEntity.ok()
                .body(customerService.getMyReservations(0L));
    }

    @GetMapping("/2")
    public ResponseEntity<List<ConsultingListResponse>> getMyConsultings() {
        return ResponseEntity.ok()
                .body(customerService.getMyConsultings(0L));
    }

    @GetMapping("/3")
    public ResponseEntity<List<ReviewListResponse>> getMyReviews() {
        return ResponseEntity.ok()
                .body(customerService.getMyReviews(0L));
    }

    @PatchMapping
    public ResponseEntity<Message> updateCustomer(@RequestBody CustomerUpdateRequest customerUpdateRequest) {
        return ResponseEntity.ok()
                .body(customerService.updateCustomer(0L, customerUpdateRequest));
    }

    @PatchMapping("/password")
    public ResponseEntity<Message> updateCustomerPassword(@RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        return ResponseEntity.ok()
                .body(customerService.updateCustomerPassword(0L, passwordUpdateRequest));
    }

    @DeleteMapping
    public ResponseEntity<Message> deleteCustomer() {
        return ResponseEntity.ok()
                .body(customerService.deleteCustomer(0L));
    }
}
