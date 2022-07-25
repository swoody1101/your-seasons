package com.yourseason.backend.member.consultant.controller.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantReviewResponse {

    private double starAverage;
    private List<ReviewListResponse> reviews;
}
