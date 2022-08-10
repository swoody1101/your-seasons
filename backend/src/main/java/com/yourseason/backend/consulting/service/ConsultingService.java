package com.yourseason.backend.consulting.service;

import com.yourseason.backend.common.exception.BadRequestException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.consulting.controller.dto.ConsultingCreateResponse;
import com.yourseason.backend.consulting.controller.dto.ConsultingJoinRequest;
import com.yourseason.backend.consulting.controller.dto.ConsultingJoinResponse;
import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
public class ConsultingService {

    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";
    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";
    private static final String CONSULTING_NOT_FOUND = "컨설팅이 개설되지 않았습니다.";
    private static final String SESSION_DELIMITER = "-";
    private static final String EMAIL_FORMAT = "[@.]";

    private final ConsultantRepository consultantRepository;
    private final CustomerRepository customerRepository;

    public ConsultingCreateResponse createConsulting(Long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        String sessionId = getSessionId(consultant);
        consultant.createConsulting(
                Consulting.builder()
                        .consultant(consultant)
                        .sessionId(sessionId)
                        .build());
        consultantRepository.save(consultant);
        return ConsultingCreateResponse.builder()
                .sessionId(sessionId)
                .sessionCreatedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }

    public ConsultingJoinResponse joinConsulting(Long customerId, ConsultingJoinRequest consultingJoinRequest) {
        Consultant consultant = consultantRepository.findByNicknameAndIsActiveTrue(consultingJoinRequest.getNickname())
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        Consulting consulting = consultant.getConsultings()
                .stream()
                .filter(Consulting::isActive)
                .findFirst()
                .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_FOUND));
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        customer.joinConsulting(consulting);
        customerRepository.save(customer);
        return ConsultingJoinResponse.builder()
                .sessionId(getSessionId(consulting.getConsultant()))
                .build();
    }

    private String getSessionId(Consultant consultant) {
        return String.join(SESSION_DELIMITER, consultant.getEmail().split(EMAIL_FORMAT));
    }
}
