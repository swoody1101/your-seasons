package com.yourseason.backend.member.consultant.controller.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationDetailListResponse {

    private Long reservationId;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private String nickname;
    private String imageUrl;
    private String request;
    private boolean isActive;
}
