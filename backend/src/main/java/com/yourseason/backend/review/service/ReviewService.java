package com.yourseason.backend.review.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.DuplicationException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongAccessException;
import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.consulting.domain.ConsultingRepository;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.review.controller.dto.ReviewRequest;
import com.yourseason.backend.review.controller.dto.ReviewResponse;
import com.yourseason.backend.review.domain.Review;
import com.yourseason.backend.review.domain.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";
    private static final String REVIEW_NOT_FOUND = "해당 리뷰를 찾을 수 없습니다.";
    private static final String CONSULTING_NOT_FOUND = "해당 컨설팅을 찾을 수 없습니다.";
    private static final String WRONG_ACCESS = "잘못된 접근입니다.";
    private static final String REVIEW_EXISTS = "이미 리뷰를 등록하셨습니다.";
    private static final String REVIEW_DELETED = "이미 삭제된 리뷰입니다.";

    private final CustomerRepository customerRepository;
    private final ReviewRepository reviewRepository;
    private final ConsultingRepository consultingRepository;

    @Transactional
    public ReviewResponse createReview(Long customerId, Long consultingId, ReviewRequest reviewRequest) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        Consulting consulting = consultingRepository.findById(consultingId)
                .orElseThrow(() -> new NotFoundException(CONSULTING_NOT_FOUND));
        Consultant consultant = consulting.getConsultant();

        if (consulting.hasReview()) {
            throw new DuplicationException(REVIEW_EXISTS);
        }
        Review review = reviewRequest.toEntity();
        review.register(customer, consultant, consulting, review.getStar());
        reviewRepository.save(review);

        return ReviewResponse.builder()
                .reviewId(review.getId())
                .message("succeeded")
                .build();
    }

    @Transactional
    public ReviewResponse updateReview(Long customerId, Long reviewId, ReviewRequest reviewRequest) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(REVIEW_NOT_FOUND));
        if (!customer.equals(review.getCustomer())) {
            throw new WrongAccessException(WRONG_ACCESS);
        }

        review.updateReview(reviewRequest.getStar(), reviewRequest.getComment());
        reviewRepository.save(review);

        return ReviewResponse.builder()
                .reviewId(review.getId())
                .message("succeeded")
                .build();
    }

    @Transactional
    public Message deleteReview(Long customerId, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(REVIEW_NOT_FOUND));
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        if (!customer.equals(review.getCustomer())) {
            throw new WrongAccessException(WRONG_ACCESS);
        }
        if (!review.isActive()) {
            throw new NotFoundException(REVIEW_DELETED);
        }

        review.deleteReview();
        reviewRepository.save(review);

        return new Message("succeeded");
    }
}
