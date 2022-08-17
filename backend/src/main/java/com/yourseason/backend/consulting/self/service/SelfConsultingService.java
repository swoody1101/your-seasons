package com.yourseason.backend.consulting.self.service;

import com.yourseason.backend.common.exception.InternalServerErrorException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.consulting.self.controller.dto.SelfConsultingCreateResponse;
import com.yourseason.backend.consulting.self.domain.SelfConsulting;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SelfConsultingService {

    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";
    private static final String SESSION_DELIMITER = "-";
    private static final String EMAIL_FORMAT = "[@.]";
    private static final String FAIL_TO_SAVE_SELF_CONSULTING_INFO = "자가진단 정보 저장에 실패했습니다.";

    private final CustomerRepository customerRepository;

    public SelfConsultingCreateResponse createSelfConsulting(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        customer.createSelfConsulting(getNewSelfConsulting(customer, getSessionId(customer)));
        customerRepository.save(customer);
        return SelfConsultingCreateResponse.builder()
                .selfConsultingId(getSelfConsultingId(customer))
                .build();
    }

    private String getSessionId(Customer customer) {
        return String.join(SESSION_DELIMITER, customer.getEmail().split(EMAIL_FORMAT));
    }

    private SelfConsulting getNewSelfConsulting(Customer customer, String sessionId) {
        return SelfConsulting.builder()
                .customer(customer)
                .sessionId(sessionId)
                .build();
    }

    private Long getSelfConsultingId(Customer customer) {
        return customer.getSelfConsultings()
                .stream()
                .filter(SelfConsulting::isActive)
                .map(SelfConsulting::getId)
                .findFirst()
                .orElseThrow(() -> new InternalServerErrorException(FAIL_TO_SAVE_SELF_CONSULTING_INFO));
    }
}
