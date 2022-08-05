package com.yourseason.backend.review.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewResponse {

    private Long reviewId;
    private String message;
}
