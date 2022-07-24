package com.yourseason.backend.member.customer.controller;

import com.yourseason.backend.member.customer.controller.dto.ConsultingListResponse;
import com.yourseason.backend.member.customer.controller.dto.CustomerSignupRequest;
import com.yourseason.backend.member.customer.controller.dto.ReservationListResponse;
import com.yourseason.backend.member.customer.controller.dto.ReviewListResponse;
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

    @GetMapping("/1")
    public ResponseEntity<List<ReservationListResponse>> getCustomerReservations() {
        return ResponseEntity.ok()
                .body(customerService.getCustomerReservations(0L));
    }

    @GetMapping("/2")
    public ResponseEntity<List<ConsultingListResponse>> getCustomerConsultings() {
        return ResponseEntity.ok()
                .body(customerService.getCustomerConsultings(0L));
    }

    @GetMapping("/3")
    public ResponseEntity<List<ReviewListResponse>> getCustomerReviews() {
        return ResponseEntity.ok()
                .body(customerService.getCustomerReviews(0L));
    }
}
