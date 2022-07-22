package com.yourseason.backend.member.customer.controller;

import com.yourseason.backend.member.customer.controller.dto.CustomerSignupRequest;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void signup(@RequestBody CustomerSignupRequest request) {
        customerService.createCustomer(request);
    }
}
