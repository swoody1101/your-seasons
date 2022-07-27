package com.yourseason.backend.review.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.review.controller.dto.ReviewCreateRequest;
import com.yourseason.backend.review.controller.dto.ReviewCreateResponse;
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
    public ResponseEntity<ReviewCreateResponse> createReview(@PathVariable Long consultantId, @RequestBody ReviewCreateRequest reviewCreateRequest) {
        return ResponseEntity.created(URI.create("/"))
                .body(reviewService.createReview(2L, consultantId, reviewCreateRequest));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Message> deleteReview(@PathVariable Long reviewId) {
        return ResponseEntity.ok()
                .body(reviewService.deleteReview(0L, reviewId));
    }
}
