package com.yourseason.backend.consulting.service;

import com.yourseason.backend.common.exception.BadRequestException;
import com.yourseason.backend.common.exception.InternalServerErrorException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongAccessException;
import com.yourseason.backend.consulting.controller.dto.ConsultingCreateResponse;
import com.yourseason.backend.consulting.controller.dto.ConsultingJoinResponse;
import com.yourseason.backend.consulting.controller.dto.ConsultingRequest;
import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.reservation.domain.Reservation;
import com.yourseason.backend.reservation.domain.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
public class ConsultingService {

    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";
    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";
    private static final String RESERVATION_NOT_FOUND = "해당 예약을 찾을 수 없습니다.";
    private static final String CONSULTING_NOT_OPENED = "컨설팅이 개설되지 않았습니다.";
    private static final String CAN_NOT_ENTER_CONSULTING = "해당 컨설팅에 입장하실 수 없습니다.";
    private static final String ALREADY_ENTER_CONSULTING = "이미 입장한 컨설팅입니다.";
    private static final String FAIL_TO_SAVE_CONSULTING_INFO = "컨설팅 정보 저장에 실패했습니다.";
    private static final String CONSULTING_EXISTS = "개설된 컨설팅이 존재합니다.";
    private static final String SESSION_DELIMITER = "-";
    private static final String EMAIL_FORMAT = "[@.]";

    private final ConsultantRepository consultantRepository;
    private final CustomerRepository customerRepository;
    private final ReservationRepository reservationRepository;

    @Transactional
    public ConsultingCreateResponse createConsulting(Long consultantId, ConsultingRequest consultingRequest) {
        Reservation reservation = reservationRepository.findById(consultingRequest.getReservationId())
                .orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        if (!consultant.equals(reservation.getConsultant())) {
            throw new WrongAccessException(CAN_NOT_ENTER_CONSULTING);
        }
        checkConsultingExistence(consultant);
        String sessionId = getSessionId(consultant);
        consultant.createConsulting(getNewConsulting(consultant, sessionId));
        consultantRepository.save(consultant);
        return ConsultingCreateResponse.builder()
                .consultingId(getConsultingId(consultant))
                .sessionId(sessionId)
                .sessionCreatedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }

    @Transactional
    public ConsultingJoinResponse joinConsulting(Long customerId, ConsultingRequest consultingRequest) {
        Reservation reservation = reservationRepository.findById(consultingRequest.getReservationId())
                .orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        if (!customer.equals(reservation.getCustomer())) {
            throw new WrongAccessException(CAN_NOT_ENTER_CONSULTING);
        }
        Consultant consultant = reservation.getConsultant();
        Consulting consulting = consultant.getConsultings()
                .stream()
                .filter(Consulting::isActive)
                .findFirst()
                .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_OPENED));
        checkContainingCustomer(consulting);
        customer.joinConsulting(consulting);
        customerRepository.save(customer);
        return ConsultingJoinResponse.builder()
                .sessionId(getSessionId(consultant))
                .build();
    }

    private String getSessionId(Consultant consultant) {
        return String.join(SESSION_DELIMITER, consultant.getEmail().split(EMAIL_FORMAT));
    }

    private Consulting getNewConsulting(Consultant consultant, String sessionId) {
        return Consulting.builder()
                .consultant(consultant)
                .sessionId(sessionId)
                .build();
    }

    private Long getConsultingId(Consultant consultant) {
        return consultant.getConsultings()
                .stream()
                .filter(Consulting::isActive)
                .map(Consulting::getId)
                .findFirst()
                .orElseThrow(() -> new InternalServerErrorException(FAIL_TO_SAVE_CONSULTING_INFO));
    }

    private void checkContainingCustomer(Consulting consulting) {
        if (consulting.getCustomer() != null) {
            throw new BadRequestException(ALREADY_ENTER_CONSULTING);
        }
    }

    private void checkConsultingExistence(Consultant consultant) {
        consultant.getConsultings()
                .stream()
                .filter(Consulting::isActive)
                .findFirst()
                .ifPresent(consulting -> {
                    throw new BadRequestException(CONSULTING_EXISTS);
                });
    }
}
