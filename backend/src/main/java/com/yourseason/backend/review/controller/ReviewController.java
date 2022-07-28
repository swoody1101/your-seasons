package com.yourseason.backend.review.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.review.controller.dto.ReviewRequest;
import com.yourseason.backend.review.controller.dto.ReviewResponse;
import com.yourseason.backend.review.service.ReviewService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/{consultantId}")
    public ResponseEntity<ReviewResponse> createReview(@RequestHeader("X-Auth-Token") String token,
                                                       @PathVariable Long consultantId,
                                                       @RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok()
                .body(reviewService.createReview(JwtUtil.getMemberId(token), consultantId, reviewRequest));
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(@PathVariable Long reviewId,
                                                       @RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok()
                .body(reviewService.updateReview(reviewId, reviewRequest));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Message> deleteReview(@RequestHeader("X-Auth-Token") String token,
                                                @PathVariable Long reviewId) {
        return ResponseEntity.ok()
                .body(reviewService.deleteReview(JwtUtil.getMemberId(token), reviewId));
    }
}
