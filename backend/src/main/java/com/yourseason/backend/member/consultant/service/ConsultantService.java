package com.yourseason.backend.member.consultant.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.NotEqualException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.consultant.controller.dto.*;
import com.yourseason.backend.member.consultant.domain.*;
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

    private final PasswordEncoder passwordEncoder;
    private final ConsultantRepository consultantRepository;
    private final LicenseRepository licenseRepository;
    private final ClosedDayRepository closedDayRepository;

    public void createConsultant(ConsultantSignupRequest consultantSignupRequest) {
        Consultant consultant = consultantSignupRequest.toEntity(passwordEncoder);
        License license = licenseRepository.findByName(consultantSignupRequest.getLicenseName())
                .orElseThrow(() -> new NotFoundException(LICENSE_NOT_FOUND));
        consultant.registerLicense(license);
        consultantRepository.save(consultant);
    }
    
    public Message createClosedDay(Long consultantId, LocalDate closedDay) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        consultant.addClosedDay(
                ClosedDay.builder()
                        .date(closedDay)
                        .consultant(consultant)
                        .build());
        consultantRepository.save(consultant);
        return new Message("succeeded");
    }

    public List<ConsultantListResponse> getConsultants() {
        return consultantRepository.findAll()
                .stream()
                .map(consultant ->
                        ConsultantListResponse.builder()
                                .consultantId(consultant.getId())
                                .nickname(consultant.getNickname())
                                .email(consultant.getEmail())
                                .star(consultant.getStarAverage())
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
                        .reservationDate(reservation.getCreatedDate().toLocalDate())
                        .reservationTime(reservation.getCreatedDate().toLocalTime())
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
                .map(review -> ReviewListResponse.builder()
                        .reviewId(review.getId())
                        .nickname(consultant.getNickname())
                        .imageUrl(consultant.getImageUrl())
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
        if (!passwordUpdateRequest.getBeforePassword().equals(consultant.getPassword())) {
            throw new NotEqualException(PASSWORD_NOT_EQUAL);
        }
        consultant.changePassword(passwordUpdateRequest.getAfterPassword());
        consultantRepository.save(consultant);
        return new Message("succeeded");
    }

    public Message deleteConsultant(Long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        consultant.withdraw();
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
}
