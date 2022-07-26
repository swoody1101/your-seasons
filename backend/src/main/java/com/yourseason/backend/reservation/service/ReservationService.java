package com.yourseason.backend.reservation.service;

import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.reservation.controller.dto.ReservationCreateRequest;
import com.yourseason.backend.reservation.controller.dto.ReservationCreateResponse;
import com.yourseason.backend.reservation.domain.Reservation;
import com.yourseason.backend.reservation.domain.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReservationService {

    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";
    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";

    private final CustomerRepository customerRepository;
    private final ConsultantRepository consultantRepository;
    private final ReservationRepository reservationRepository;

    public ReservationCreateResponse createReservation(Long customerId, Long consultantId, ReservationCreateRequest reservationCreateRequest) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        Reservation reservation = reservationCreateRequest.toEntity();
        reservation.register(customer, consultant);
        reservationRepository.save(reservation);

        return ReservationCreateResponse.builder()
                .reservationId(reservation.getId())
                .message("succeeded")
                .build();
    }
}
