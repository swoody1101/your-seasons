package com.yourseason.backend.member.consultant.controller.dto;

import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantReservationResponse {

    private double starAverage;
    private List<ReservationDetailListResponse> reservations;
}
