package com.yourseason.backend.member.customer.service;

import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.member.customer.controller.dto.CustomerSignupRequest;
import com.yourseason.backend.member.customer.controller.dto.ReservationListResponse;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.review.domain.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";

    private final CustomerRepository customerRepository;
    private final ReservationRepository reservationRepository;

    public void createCustomer(CustomerSignupRequest request) {
        customerRepository.save(request.toEntity());
    }

    public List<ReservationListResponse> getCustomerReservations(Long tokenId) {
        // 1. 고객을 찾는다.
        Customer customer = customerRepository.findById(tokenId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        // 2. 고객의 예약 정보를 찾는다.


        // 3. 각 예약 정보의 컨설턴트 정보를 찾는다.

        // 4. 빌드하여 리턴한다.
    }
}
