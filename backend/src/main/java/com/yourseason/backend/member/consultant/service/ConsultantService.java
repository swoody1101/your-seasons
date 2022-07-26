package com.yourseason.backend.member.consultant.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.ImageUploadException;
import com.yourseason.backend.common.exception.NotEqualException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.member.consultant.controller.dto.*;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.consultant.domain.License;
import com.yourseason.backend.member.consultant.domain.LicenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ConsultantService {

    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";
    private static final String LICENSE_NOT_FOUND = "자격증이 존재하지 않습니다.";
    private static final String IMAGE_UPLOAD_FAIL = "이미지 업로드에 실패했습니다.";
    private static final String PASSWORD_NOT_EQUAL = "비밀번호가 올바르지 않습니다.";

    private final ConsultantRepository consultantRepository;
    private final LicenseRepository licenseRepository;

    public void createConsultant(ConsultantSignupRequest consultantSignupRequest) {
        Consultant consultant = consultantSignupRequest.toEntity();
        License license = licenseRepository.findByName(consultantSignupRequest.getLicenseName())
                .orElseThrow(() -> new NotFoundException(LICENSE_NOT_FOUND));
        consultant.registerLicense(license);
        consultantRepository.save(consultant);
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

    public ConsultantReservationResponse getMyReservations(long consultantId) {
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

    public ConsultantReviewResponse getMyReviews(long consultantId) {
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

    public Message updateConsultant(Long consultantId, ConsultantUpdateRequest consultantUpdateRequest, MultipartFile multipartFile) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        String imageUrl = consultant.getImageUrl();
        if (consultant.getImageUrl() == null) {
            String filePath = System.getProperty("user.dir") + "/src/min/resources/static/img/";
            String fileName = consultant.getEmail();
            imageUrl = filePath + fileName;
        }
        try {
            byte[] bytes = multipartFile.getBytes();
            File file = new File(imageUrl);
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(bytes);
            fileOutputStream.flush();
            fileOutputStream.close();
        } catch (IOException e) {
            throw new ImageUploadException(IMAGE_UPLOAD_FAIL);
        }

        consultant.updateProfile(
                consultantUpdateRequest.getNickname(),
                consultantUpdateRequest.getContact(),
                imageUrl,
                consultantUpdateRequest.getIntroduction(),
                consultantUpdateRequest.getCost());
        consultantRepository.save(consultant);
        return new Message("succeeded");
    }

    public Message updateConsultantPassword(Long consultantId, ConsultantPasswordUpdateRequest consultantPasswordUpdateRequest) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        if (!consultantPasswordUpdateRequest.getBeforePassword().equals(consultant.getPassword())) {
            throw new NotEqualException(PASSWORD_NOT_EQUAL);
        }
        consultant.changePassword(consultantPasswordUpdateRequest.getAfterPassword());
        return new Message("succeeded");
    }

    public Message deleteConsultant(long consultantId) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        consultant.withdraw();
        return new Message("succeeded");
    }
}
