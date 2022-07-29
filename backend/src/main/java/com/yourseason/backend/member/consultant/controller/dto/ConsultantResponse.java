package com.yourseason.backend.member.consultant.controller.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantResponse {

    private Long consultantId;
    private String nickname;
    private String contact;
    private String imageUrl;
    private String introduction;
    private String cost;
    private String licenseName;
    private List<ClosedDayListResponse> closedDays;
    private List<ReservationListResponse> reservations;
}
