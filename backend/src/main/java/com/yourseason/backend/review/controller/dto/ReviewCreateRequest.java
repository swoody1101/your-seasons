package com.yourseason.backend.review.controller.dto;

import com.yourseason.backend.review.domain.Review;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewCreateRequest {

    private int star;
    private String comment;

    public Review toEntity() {
        return Review.builder()
                .star(star)
                .comment(comment)
                .build();
    }
}
