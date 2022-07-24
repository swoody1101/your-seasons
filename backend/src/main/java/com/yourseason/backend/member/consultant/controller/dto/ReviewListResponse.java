package com.yourseason.backend.member.consultant.controller.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewListResponse {

    private Long reviewId;
    private String nickname;
    private String imageUrl;
    private double star;
    private String comment;
    private LocalDate createdDate;
}
