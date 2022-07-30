package com.yourseason.backend.reservation.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationCreateResponse {

    private Long reservationId;
    private String message;
}
