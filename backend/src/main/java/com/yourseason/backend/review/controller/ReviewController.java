package com.yourseason.backend.review.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.review.controller.dto.ReviewRequest;
import com.yourseason.backend.review.controller.dto.ReviewResponse;
import com.yourseason.backend.review.service.ReviewService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/{consultingId}")
    public ResponseEntity<ReviewResponse> createReview(@RequestHeader("Authorization") String token,
                                                       @PathVariable Long consultingId,
                                                       @RequestBody ReviewRequest reviewRequest) {
        ReviewResponse response = reviewService.createReview(JwtUtil.getMemberId(token), consultingId, reviewRequest);
        log.info("리뷰 등록 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(@RequestHeader("Authorization") String token,
                                                       @PathVariable Long reviewId,
                                                       @RequestBody ReviewRequest reviewRequest) {
        ReviewResponse response = reviewService.updateReview(JwtUtil.getMemberId(token), reviewId, reviewRequest);
        log.info("리뷰 수정 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Message> deleteReview(@RequestHeader("Authorization") String token,
                                                @PathVariable Long reviewId) {
        Message message = reviewService.deleteReview(JwtUtil.getMemberId(token), reviewId);
        log.info("리뷰 삭제 성공");
        return ResponseEntity.ok()
                .body(message);
    }
}
