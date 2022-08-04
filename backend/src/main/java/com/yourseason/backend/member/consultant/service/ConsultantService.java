package com.yourseason.backend.member.consultant.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.*;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.consultant.controller.dto.*;
import com.yourseason.backend.member.consultant.domain.*;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ConsultantService {

    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";
    private static final String LICENSE_NOT_FOUND = "자격증이 존재하지 않습니다.";
    private static final String PASSWORD_NOT_EQUAL = "비밀번호가 올바르지 않습니다.";
    private static final String CLOSED_DAY_NOT_FOUND = "해당 날짜는 휴무일이 아닙니다.";
    private static final String PASSWORD_WRONG_FORM = "변경할 비밀번호가 현재 비밀번호와 일치합니다.";
    private static final String CLOSED_DAY_DUPLICATED = "이미 휴무일로 등록하셨습니다.";
    private static final String RESERVATION_EXIST = "해당 날짜는 예약이 존재합니다.";
    private static final String EMAIL_DUPLICATED = "이메일이 중복됩니다.";
    private static final String NICKNAME_DUPLICATED = "닉네임이 중복됩니다.";

    private final PasswordEncoder passwordEncoder;
    private final ConsultantRepository consultantRepository;
    private final CustomerRepository customerRepository;
    private final LicenseRepository licenseRepository;
    private final ClosedDayRepository closedDayRepository;

    public Message createConsultant(ConsultantSignupRequest consultantSignupRequest) {
        checkValidEmail(consultantSignupRequest.getEmail());
        checkValidNickname(consultantSignupRequest.getNickname());
        Consultant consultant = consultantSignupRequest.toEntity(passwordEncoder);
        License license = licenseRepository.findByName(consultantSignupRequest.getLicenseName())
                .orElseThrow(() -> new NotFoundException(LICENSE_NOT_FOUND));
        consultant.registerLicense(license);
        consultantRepository.save(consultant);
        return new Message("succeeded");
    }

    public Message createClosedDay(Long consultantId, ClosedDayRequest closedDayRequest) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        consultant.getReservations()
                .stream()
                .filter(reservation -> reservation.isActive())
                .filter(reservation -> reservation.getDate().isEqual(closedDayRequest.getClosedDay()))
                .findAny()
                .ifPresent(reservation -> {
                    throw new BadRequestException(RESERVATION_EXIST);
                });
        consultant.getClosedDays()
                .stream()
                .filter(closedDay -> closedDay.getDate().isEqual(closedDayRequest.getClosedDay()))
                .findAny()
                .ifPresent(closedDay -> {
                    throw new DuplicationException(CLOSED_DAY_DUPLICATED);
                });
        consultant.addClosedDay(closedDayRequest.toEntity(consultant));
        consultantRepository.save(consultant);
        return new Message("succeeded");
    }

    public List<ConsultantListResponse> getConsultants() {
        return consultantRepository.findByIsActiveTrue()
                .stream()
                .map(consultant ->
                        ConsultantListResponse.builder()
                                .consultantId(consultant.getId())
                                .nickname(consultant.getNickname())
                                .introduction(consultant.getIntroduction())
                                .reviewCount(consultant.getReviewCount())
                                .starAverage(consultant.getStarAverage())
                                .cost(consultant.getCost())
                                .imageUrl(consultant.getImageUrl())
                                .build())
                .collect(Collectors.toList());
    }

    public ConsultantResponse getConsultant(Long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        List<ReservationListResponse> reservations = consultant.getReservations()
                .stream()
                .map(reservation -> ReservationListResponse.builder()
                        .reservationId(reservation.getId())
                        .reservationDate(reservation.getDate())
                        .reservationTime(reservation.getTime())
                        .request(reservation.getRequest())
                        .build())
                .collect(Collectors.toList());

        List<ClosedDayListResponse> closedDays = consultant.getClosedDays()
                .stream()
                .filter(closedDay -> closedDay.getDate()
                        .isAfter(LocalDate.now()))
                .map(closedDay -> ClosedDayListResponse.builder()
                        .closedDayId(closedDay.getId())
                        .date(closedDay.getDate())
                        .build())
                .collect(Collectors.toList());

        return ConsultantResponse.builder()
                .consultantId(consultantId)
                .nickname(consultant.getNickname())
                .contact(consultant.getContact())
                .imageUrl(consultant.getImageUrl())
                .introduction(consultant.getIntroduction())
                .cost(consultant.getCost())
                .licenseName(consultant.getLicense().getName())
                .closedDays(closedDays)
                .reservations(reservations)
                .build();
    }

    public List<ReviewListResponse> getReviews(Long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        return consultant.getReviews()
                .stream()
                .filter(review -> review.isActive())
                .map(review -> ReviewListResponse.builder()
                        .nickname(consultant.getNickname())
                        .imageUrl(consultant.getImageUrl())
                        .star(review.getStar())
                        .comment(review.getComment())
                        .createdDate(review.getCreatedDate().toLocalDate())
                        .build())
                .collect(Collectors.toList());
    }

    public ConsultantReservationResponse getMyReservations(Long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        List<ReservationDetailListResponse> reservationDetailListResponses = consultant.getReservations()
                .stream()
                .map(reservation -> ReservationDetailListResponse.builder()
                        .reservationId(reservation.getId())
                        .reservationDate(reservation.getDate())
                        .reservationTime(reservation.getTime())
                        .nickname(reservation.getCustomer().getNickname())
                        .imageUrl(reservation.getCustomer().getImageUrl())
                        .request(reservation.getRequest())
                        .isActive(reservation.isActive())
                        .build())
                .collect(Collectors.toList());

        return ConsultantReservationResponse.builder()
                .starAverage(consultant.getStarAverage())
                .reservations(reservationDetailListResponses)
                .build();
    }

    public ConsultantReviewResponse getMyReviews(Long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        List<ReviewListResponse> reviewsListResponses = consultant.getReviews()
                .stream()
                .filter(review -> review.isActive())
                .map(review -> ReviewListResponse.builder()
                        .reviewId(review.getId())
                        .nickname(review.getCustomer().getNickname())
                        .imageUrl(review.getCustomer().getImageUrl())
                        .star(review.getStar())
                        .comment(review.getComment())
                        .createdDate(review.getCreatedDate().toLocalDate())
                        .build())
                .collect(Collectors.toList());

        return ConsultantReviewResponse.builder()
                .starAverage(consultant.getStarAverage())
                .reviews(reviewsListResponses)
                .build();
    }

    public ConsultantInfoResponse getConsultantInfo(Long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        List<ClosedDayListResponse> closedDayListResponses = consultant.getClosedDays()
                .stream()
                .map(closedDay -> ClosedDayListResponse.builder()
                        .closedDayId(closedDay.getId())
                        .date(closedDay.getDate())
                        .build())
                .collect(Collectors.toList());

        return ConsultantInfoResponse.builder()
                .name(consultant.getName())
                .nickname(consultant.getNickname())
                .birth(consultant.getBirth())
                .contact(consultant.getContact())
                .email(consultant.getEmail())
                .introduction(consultant.getIntroduction())
                .cost(consultant.getCost())
                .imageUrl(consultant.getImageUrl())
                .consultingFileUrl(consultant.getConsultingFile())
                .licenseName(consultant.getLicense().getName())
                .licenseNumber(consultant.getLicenseNumber())
                .closedDays(closedDayListResponses)
                .build();
    }

    public Message updateConsultant(Long consultantId, ConsultantUpdateRequest consultantUpdateRequest) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        consultant.updateProfile(
                consultantUpdateRequest.getNickname(),
                consultantUpdateRequest.getContact(),
                consultantUpdateRequest.getImageUrl(),
                consultantUpdateRequest.getIntroduction(),
                consultantUpdateRequest.getCost());
        consultantRepository.save(consultant);
        return new Message("succeeded");
    }

    public Message updateConsultantPassword(Long consultantId, PasswordUpdateRequest passwordUpdateRequest) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        checkValidPassword(passwordUpdateRequest.getBeforePassword(), consultant.getPassword());
        if (passwordUpdateRequest.getBeforePassword().equals(passwordUpdateRequest.getAfterPassword())) {
            throw new WrongFormException(PASSWORD_WRONG_FORM);
        }
        consultant.changePassword(passwordEncoder, passwordUpdateRequest.getAfterPassword());
        consultantRepository.save(consultant);
        return new Message("succeeded");
    }

    public Message deleteConsultant(Long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        consultant.withdraw();
        consultantRepository.save(consultant);
        return new Message("succeeded");
    }

    public Message deleteClosedDay(Long consultantId, Long closedDayId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        ClosedDay closedDay = closedDayRepository.findById(closedDayId)
                .orElseThrow(() -> new NotFoundException(CLOSED_DAY_NOT_FOUND));

        consultant.deleteClosedDay(closedDay);
        consultantRepository.save(consultant);
        return new Message("succeeded");
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
