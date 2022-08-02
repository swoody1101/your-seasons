package com.yourseason.backend.member.consultant.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantReservationResponse {

    private double starAverage;
    private List<ReservationDetailListResponse> reservations;
}
