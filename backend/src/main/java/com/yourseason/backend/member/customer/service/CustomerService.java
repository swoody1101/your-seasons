package com.yourseason.backend.member.customer.service;

import com.yourseason.backend.member.customer.controller.dto.CustomerSignupRequest;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class CustomerService {

    private static final String USER_NOT_FOUND = "해당 사용자를 찾을 수 없습니다.";

    private final CustomerRepository customerRepository;

    public void createCustomer(CustomerSignupRequest request) {
        customerRepository.save(request.toEntity());
    }
}
