package com.yourseason.backend.member.consultant.controller.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewListResponse {

    private Long reviewId;
    private String nickname;
    private String imageUrl;
    private int star;
    private String comment;
    private LocalDate createdDate;
}
