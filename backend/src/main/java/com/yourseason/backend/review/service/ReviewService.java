package com.yourseason.backend.review.service;

import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.consulting.domain.ConsultingRepository;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
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
    private static final String REVIEW_NOT_FOUND = "해당 리뷰를 찾을 수 없습니다.";
    private static final String CONSULTING_NOT_FOUND = "해당 전문가진단을 찾을 수 없습니다.";

    private final CustomerRepository customerRepository;
    private final ConsultantRepository consultantRepository;
    private final ReviewRepository reviewRepository;
    private final ConsultingRepository consultingRepository;

    public ReviewCreateResponse createReview(long customerId, long consultantId, long consultingId, ReviewCreateRequest reviewCreateRequest) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));

        Review review = reviewCreateRequest.toEntity();
        review.register(customer, consultant);
        reviewRepository.save(review);

        Consulting consulting = consultingRepository.findById(consultingId)
                .orElseThrow(() -> new NotFoundException(CONSULTING_NOT_FOUND));
        consulting.builder()
                .hasReview(true)
                .build();
        consultingRepository.save(consulting);

        return ReviewCreateResponse.builder()
                .reviewId(review.getId())
                .message("후기 등록이 완료되었습니다.")
                .build();
    }
}
