package com.yourseason.backend.member.customer.service;

import com.yourseason.backend.member.customer.controller.dto.CustomerSignupRequest;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Transactional
    public void createCustomer(CustomerSignupRequest request) {
        customerRepository.save(request.toEntity());
    }
}
