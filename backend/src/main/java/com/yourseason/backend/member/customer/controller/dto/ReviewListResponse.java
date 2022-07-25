package com.yourseason.backend.member.customer.controller.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewListResponse {

    private Long reviewId;
    private String consultantNickname;
    private String consultantImageUrl;
    private double star;
    private String comment;
    private LocalDate reviewDate;
}
