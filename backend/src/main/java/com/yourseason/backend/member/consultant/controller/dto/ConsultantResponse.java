package com.yourseason.backend.member.consultant.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantResponse {

    private Long consultantId;
    private String nickname;
    private String contact;
    private double starAverage;
    private int reviewCount;
    private String imageUrl;
    private String introduction;
    private String cost;
    private String licenseName;
    private List<ClosedDayListResponse> closedDays;
    private List<ReservationListResponse> reservations;
}
