package com.yourseason.backend.member.consultant.controller.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantListResponse {

    private Long consultantId;
    private String nickname;
    private String introduction;
    private int reviewCount;
    private double starAverage;
    private String cost;
    private String imageUrl;
}
