package com.yourseason.backend.review.controller.dto;

import com.yourseason.backend.review.domain.Review;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewRequest {

    private int star;
    private String comment;

    public Review toEntity() {
        return Review.builder()
                .star(star)
                .comment(comment)
                .build();
    }
}
