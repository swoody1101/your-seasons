package com.yourseason.backend.member.customer.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.member.customer.controller.dto.*;
import com.yourseason.backend.member.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<Message> updateCustomer(@RequestPart CustomerUpdateRequest customerUpdateRequest, @RequestPart MultipartFile multipartFile) {
        customerService.updateCustomer(0L, customerUpdateRequest, multipartFile);
        return ResponseEntity.ok()
                .body(new Message("succeeded"));
    }

    @DeleteMapping
    public ResponseEntity<Message> deleteCustomer() {
        customerService.deleteCustomer(0L);
        return ResponseEntity.ok()
                .body(new Message("succeeded"));
    }
}
