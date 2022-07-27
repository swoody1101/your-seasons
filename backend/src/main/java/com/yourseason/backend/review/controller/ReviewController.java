package com.yourseason.backend.review.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.review.controller.dto.ReviewCreateResponse;
import com.yourseason.backend.review.controller.dto.ReviewRequest;
import com.yourseason.backend.review.service.ReviewService;
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
    public ResponseEntity<ReviewCreateResponse> createReview(@PathVariable Long consultantId, @RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.created(URI.create("/"))
                .body(reviewService.createReview(2L, consultantId, reviewRequest));
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<Message> updateReview(@PathVariable Long reviewId, @RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok()
                .body(reviewService.updateReview(reviewId, reviewRequest));
    }
}
