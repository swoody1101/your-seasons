package com.yourseason.backend.review.service;

import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.member.exception.NotFoundException;
import com.yourseason.backend.review.controller.dto.ReviewCreateRequest;
import com.yourseason.backend.review.controller.dto.ReviewCreateResponse;
import com.yourseason.backend.review.domain.Review;
import com.yourseason.backend.review.domain.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";
    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";

    private final CustomerRepository customerRepository;
    private final ConsultantRepository consultantRepository;
    private final ReviewRepository reviewRepository;

    public ReviewCreateResponse createReview(ReviewCreateRequest reviewCreateRequest) {
        Customer customer = customerRepository.findById(reviewCreateRequest.getUserId())
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        Consultant consultant = consultantRepository.findById(reviewCreateRequest.getConsultantId())
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        Review review = reviewCreateRequest.toEntity();
        review.registCustomerAndCunsultant(customer, consultant);
        reviewRepository.save(review);

        return ReviewCreateResponse.builder()
                .reviewId(review.getId())
                .message("후기 등록이 완료되었습니다.")
                .build();
    }
}
