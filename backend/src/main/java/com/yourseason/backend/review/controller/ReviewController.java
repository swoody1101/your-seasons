package com.yourseason.backend.review.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.review.controller.dto.ReviewRequest;
import com.yourseason.backend.review.controller.dto.ReviewResponse;
import com.yourseason.backend.review.service.ReviewService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/{consultingId}")
    public ResponseEntity<ReviewResponse> createReview(@RequestHeader("Authorization") String token,
                                                       @PathVariable Long consultingId,
                                                       @RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok()
                .body(reviewService.createReview(JwtUtil.getMemberId(token), consultingId, reviewRequest));
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(@RequestHeader("Authorization") String token,
                                                       @PathVariable Long reviewId,
                                                       @RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok()
                .body(reviewService.updateReview(JwtUtil.getMemberId(token), reviewId, reviewRequest));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Message> deleteReview(@RequestHeader("Authorization") String token,
                                                @PathVariable Long reviewId) {
        return ResponseEntity.ok()
                .body(reviewService.deleteReview(JwtUtil.getMemberId(token), reviewId));
    }
}
