package com.yourseason.backend.member.customer.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.*;
import com.yourseason.backend.consulting.consultant.domain.Consulting;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.common.domain.Role;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.controller.dto.*;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.reservation.domain.Reservation;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Comparator;
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
    private static final String CAN_NOT_LOAD_CONSULTING_FILE = "진단 결과를 로드할 수 없습니다.";

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
                .sorted(Comparator.comparing(Reservation::getDate)
                        .thenComparing(Reservation::getTime))
                .filter(Reservation::isActive)
                .filter(reservation -> reservation.getTime()
                        .atDate(reservation.getDate())
                        .isAfter(LocalDateTime.now()))
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
                .filter(review -> review.isActive())
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
                        .tone(consulting.getConsultingResult().getTone().getName())
                        .bestColorSet(consulting.getConsultingResult().getBestColorSet().getColorSet().getColorColorSets()
                                .stream()
                                .map(colorColorSet -> colorColorSet.getColor().getHex())
                                .collect(Collectors.toList()))
                        .worstColorSet(consulting.getConsultingResult().getWorstColorSet().getColorSet().getColorColorSets()
                                .stream()
                                .map(colorColorSet -> colorColorSet.getColor().getHex())
                                .collect(Collectors.toList()))
                        .consultingFile(getConsultingFile(consulting))
                        .consultingComment(consulting.getConsultingResult().getConsultingComment())
                        .hasReview(consulting.hasReview())
                        .build())
                .collect(Collectors.toList());
    }

    public List<SelfConsultingResultResponse> getMySelfConsultings(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return customer.getSelfConsultings()
                .stream()
                .map(selfConsulting -> SelfConsultingResultResponse.builder()
                        .selfConsultingId(selfConsulting.getId())
                        .selfConsultingDate(selfConsulting.getCreatedDate().toLocalDate())
                        .tone(selfConsulting.getSelfConsultingResult().getTone().getName())
                        .bestColorSet(selfConsulting.getSelfConsultingResult().getBestColorSet().getColorSet().getColorColorSets()
                                .stream()
                                .map(colorColorSet -> colorColorSet.getColor().getHex())
                                .collect(Collectors.toList()))
                        .worstColorSet(selfConsulting.getSelfConsultingResult().getWorstColorSet().getColorSet().getColorColorSets()
                                .stream()
                                .map(colorColorSet -> colorColorSet.getColor().getHex())
                                .collect(Collectors.toList()))
                        .percentages(selfConsulting.getSelfConsultingResult().getPercentages()
                                .stream()
                                .map(percentage -> PercentageResponse.builder()
                                        .tone(percentage.getTone().getName())
                                        .percentage(percentage.getPercentage())
                                        .build())
                                .collect(Collectors.toList()))
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

    private byte[] getConsultingFile(Consulting consulting) {
        try {
            InputStream imageFile = new FileInputStream(consulting.getConsultingResult().getConsultingFile());
            byte[] imageBytes = IOUtils.toByteArray(imageFile);
            imageFile.close();
            return imageBytes;
        } catch (IOException e) {
            throw new InternalServerErrorException(CAN_NOT_LOAD_CONSULTING_FILE);
        }
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
