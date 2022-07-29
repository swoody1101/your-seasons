package com.yourseason.backend.member.customer.controller.dto;

import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.reservation.domain.Reservation;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationListResponse {

    private Long reservationId;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private String consultantNickname;
    private String consultantImageUrl;
    private String request;
    private boolean isActive;
}
