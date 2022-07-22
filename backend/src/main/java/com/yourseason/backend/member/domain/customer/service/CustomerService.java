package com.yourseason.backend.member.domain.customer.service;

import com.yourseason.backend.member.domain.customer.controller.dto.CustomerSignupRequest;
import com.yourseason.backend.member.domain.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public void createCustomer(CustomerSignupRequest request) {
        customerRepository.save(request.toEntity());
    }
}
