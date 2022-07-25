package com.yourseason.backend.review.controller;

import com.yourseason.backend.review.controller.dto.ReviewCreateRequest;
import com.yourseason.backend.review.controller.dto.ReviewCreateResponse;
import com.yourseason.backend.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewCreateResponse> createReview(@RequestBody ReviewCreateRequest reviewCreateRequest) {
        return ResponseEntity.created(URI.create("/"))
                .body(reviewService.createReview(reviewCreateRequest));
    }
}
