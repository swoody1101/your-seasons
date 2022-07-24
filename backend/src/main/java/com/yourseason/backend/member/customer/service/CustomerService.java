package com.yourseason.backend.member.customer.service;

import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.member.customer.controller.dto.CustomerSignupRequest;
import com.yourseason.backend.member.customer.controller.dto.ReservationListResponse;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.reservation.domain.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private static final String CUSTOMER_NOT_FOUND = "해당 회원을 찾을 수 없습니다.";

    private final CustomerRepository customerRepository;
    private final ReservationRepository reservationRepository;

    public void createCustomer(CustomerSignupRequest request) {
        customerRepository.save(request.toEntity());
    }

    public List<ReservationListResponse> getCustomerReservations(Long tokenId) {
        Customer customer = customerRepository.findById(tokenId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return customer.getReservations()
                .stream()
                .map(reservation -> ReservationListResponse.builder()
                        .reservationDate(reservation.getDate())
                        .reservationTime(reservation.getTime())
                        .consultantNickname(reservation.getConsultant().getNickname())
                        .consultantImageUrl(reservation.getConsultant().getImageUrl())
                        .request(reservation.getRequest())
                        .isActive(reservation.isActive())
                        .build())
                .collect(Collectors.toList());
    }
}
