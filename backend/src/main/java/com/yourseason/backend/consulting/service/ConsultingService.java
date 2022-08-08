package com.yourseason.backend.consulting.service;

import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.consulting.controller.dto.ConsultingCreateResponse;
import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
public class ConsultingService {

    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";
    private static final String SESSION_DELIMITER = "-";
    private static final String EMAIL_FORMAT = "@|.";

    private final ConsultantRepository consultantRepository;

    public ConsultingCreateResponse createConsulting(Long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        String sessionId = String.join(SESSION_DELIMITER, consultant.getEmail().split(EMAIL_FORMAT));
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
}
