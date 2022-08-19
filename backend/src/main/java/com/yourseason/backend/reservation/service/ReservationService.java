package com.yourseason.backend.reservation.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.DuplicationException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongAccessException;
import com.yourseason.backend.member.common.domain.Role;
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

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReservationService {

    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";
    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";
    private static final String RESERVATION_NOT_FOUND = "해당 예약을 찾을 수 없습니다.";
    private static final String WRONG_ACCESS = "잘못된 접근입니다.";
    private static final String RESERVATION_DELETED = "이미 취소된 예약입니다.";
    private static final String RESERVATION_DUPLICATED = "해당 시간에 이미 예약이 존재합니다.";

    private final CustomerRepository customerRepository;
    private final ConsultantRepository consultantRepository;
    private final ReservationRepository reservationRepository;

    public ReservationCreateResponse createReservation(Role role, Long customerId, Long consultantId,
                                                       ReservationCreateRequest reservationCreateRequest) {
        if (Role.CONSULTANT.equals(role)) {
            throw new WrongAccessException(WRONG_ACCESS);
        }

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        checkReservationDuplication(customer.getReservations(), reservationCreateRequest);
        checkReservationDuplication(consultant.getReservations(), reservationCreateRequest);

        Reservation reservation = reservationCreateRequest.toEntity();
        reservation.register(customer, consultant);
        reservationRepository.save(reservation);
        return ReservationCreateResponse.builder()
                .reservationId(reservation.getId())
                .message("succeeded")
                .build();
    }

    public Message deleteReservation(Long customerId, Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        if (!customer.equals(reservation.getCustomer())) {
            throw new WrongAccessException(WRONG_ACCESS);
        }
        if (!reservation.isActive()) {
            throw new NotFoundException(RESERVATION_DELETED);
        }

        reservation.cancel();
        reservationRepository.save(reservation);
        return new Message("succeeded");
    }

    private void checkReservationDuplication(List<Reservation> reservations, ReservationCreateRequest reservationCreateRequest) {
        reservations.stream()
                .filter(reservation -> reservation.getDate().isEqual(reservationCreateRequest.getReservationDate()))
                .filter(reservation -> reservation.getTime().equals(reservationCreateRequest.getReservationTime()))
                .findAny()
                .ifPresent(reservation -> {
                    throw new DuplicationException(RESERVATION_DUPLICATED);
                });
    }
}
