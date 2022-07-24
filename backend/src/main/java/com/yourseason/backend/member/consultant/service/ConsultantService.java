package com.yourseason.backend.member.consultant.service;

import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.member.consultant.controller.dto.ConsultantListResponse;
import com.yourseason.backend.member.consultant.controller.dto.ConsultantResponse;
import com.yourseason.backend.member.consultant.controller.dto.ReservationListResponse;
import com.yourseason.backend.member.consultant.controller.dto.ReviewListResponse;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ConsultantService {

    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";

    private final ConsultantRepository consultantRepository;

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

        return ConsultantResponse.builder()
                .consultantId(consultantId)
                .nickname(consultant.getNickname())
                .contact(consultant.getContact())
                .imageUrl(consultant.getImageUrl())
                .introduction(consultant.getIntroduction())
                .cost(consultant.getCost())
                .licenseName(consultant.getLicense().getName())
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
}
