package com.yourseason.backend.member.customer.service;

import com.yourseason.backend.common.domain.Color;
import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.DuplicationException;
import com.yourseason.backend.common.exception.NotEqualException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongFormException;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.common.domain.Role;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.controller.dto.*;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private static final String CUSTOMER_NOT_FOUND = "해당 회원을 찾을 수 없습니다.";
    private static final String PASSWORD_NOT_EQUAL = "비밀번호가 올바르지 않습니다.";
    private static final String PASSWORD_WRONG_FORM = "변경할 비밀번호가 현재 비밀번호와 일치합니다.";
    private static final String EMAIL_DUPLICATED = "이메일이 중복됩니다.";
    private static final String NICKNAME_DUPLICATED = "닉네임이 중복됩니다.";

    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;
    private final ConsultantRepository consultantRepository;

    public Message createCustomer(CustomerSignupRequest customerSignupRequest) {
        checkValidEmail(customerSignupRequest.getEmail());
        checkValidNickname(customerSignupRequest.getNickname());
        customerRepository.save(customerSignupRequest.toEntity(passwordEncoder));
        return new Message("succeeded");
    }

    public CustomerResponse getCustomerInfo(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return CustomerResponse.builder()
                .name(customer.getName())
                .nickname(customer.getNickname())
                .birth(customer.getBirth())
                .contact(customer.getContact())
                .email(customer.getEmail())
                .imageUrl(customer.getImageUrl())
                .build();
    }

    public List<ReservationListResponse> getMyReservations(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return customer.getReservations()
                .stream()
                .map(reservation -> ReservationListResponse.builder()
                        .reservationId(reservation.getId())
                        .reservationDate(reservation.getDate())
                        .reservationTime(reservation.getTime())
                        .consultantNickname(reservation.getConsultant().getNickname())
                        .consultantImageUrl(reservation.getConsultant().getImageUrl())
                        .request(reservation.getRequest())
                        .isActive(reservation.isActive())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ReviewListResponse> getMyReviews(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return customer.getReviews()
                .stream()
                .map(review -> ReviewListResponse.builder()
                        .reviewId(review.getId())
                        .consultantNickname(review.getConsultant().getNickname())
                        .consultantImageUrl(review.getConsultant().getImageUrl())
                        .star(review.getStar())
                        .comment(review.getComment())
                        .reviewDate(review.getCreatedDate().toLocalDate())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ConsultingListResponse> getMyConsultings(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return customer.getConsultings()
                .stream()
                .map(consulting -> ConsultingListResponse.builder()
                        .consultantId(consulting.getConsultant().getId())
                        .consultingId(consulting.getId())
                        .consultantNickname(consulting.getConsultant().getNickname())
                        .consultantImageUrl(consulting.getConsultant().getImageUrl())
                        .consultingDate(consulting.getCreatedDate().toLocalDate())
                        .tone(consulting.getTestResult().getTone().getName())
                        .bestColorSet(consulting.getTestResult().getBestColorSet().getColorSet().getColors()
                                .stream()
                                .map(Color::getHex)
                                .collect(Collectors.toList()))
                        .worstColorSet(consulting.getTestResult().getWorstColorSet().getColorSet().getColors()
                                .stream()
                                .map(Color::getHex)
                                .collect(Collectors.toList()))
                        .resultImageUrl(consulting.getTestResult().getConsultingFile())
                        .comment(consulting.getComment())
                        .hasReview(consulting.hasReview())
                        .build())
                .collect(Collectors.toList());
    }

    public Message updateCustomer(Long customerId, CustomerUpdateRequest customerUpdateRequest) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        customer.updateProfile(customerUpdateRequest.getNickname(), customerUpdateRequest.getContact(), customerUpdateRequest.getImageUrl());
        customerRepository.save(customer);
        return new Message("succeeded");
    }

    public Message updateCustomerPassword(Long customerId, PasswordUpdateRequest passwordUpdateRequest) {
        Customer customer = getCustomer(customerId);
        checkValidPassword(passwordUpdateRequest.getBeforePassword(), customer.getPassword());
        if (passwordUpdateRequest.getBeforePassword().equals(passwordUpdateRequest.getAfterPassword())) {
            throw new WrongFormException(PASSWORD_WRONG_FORM);
        }
        customer.changePassword(passwordEncoder, passwordUpdateRequest.getAfterPassword());
        customerRepository.save(customer);
        return new Message(("succeeded"));
    }

    public Message deleteCustomer(Long customerId) {
        Customer customer = getCustomer(customerId);
        customer.withdraw();
        customerRepository.save(customer);
        return new Message("succeeded");
    }

    public Map<String, String> getUpdatedCustomer(Long customerId) {
        Customer customer = getCustomer(customerId);
        Map<String, String> member = new HashMap<>();
        member.put("id", String.valueOf(customerId));
        member.put("nickname", customer.getNickname());
        member.put("imageUrl", customer.getImageUrl());
        member.put("role", String.valueOf(Role.CUSTOMER));
        return member;
    }

    private Customer getCustomer(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
    }

    private void checkValidPassword(String loginPassword, String password) {
        if (!passwordEncoder.matches(loginPassword, password)) {
            throw new NotEqualException(PASSWORD_NOT_EQUAL);
        }
    }

    private void checkValidEmail(String email) {
        if (customerRepository.existsByEmail(email) || consultantRepository.existsByEmail(email)) {
            throw new DuplicationException(EMAIL_DUPLICATED);
        }
    }

    private void checkValidNickname(String nickname) {
        if (customerRepository.existsByNickname(nickname) || consultantRepository.existsByNickname(nickname)) {
            throw new DuplicationException(NICKNAME_DUPLICATED);
        }
    }
}
