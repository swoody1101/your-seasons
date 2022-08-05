package com.yourseason.backend.reservation.controller.dto;

import com.yourseason.backend.reservation.domain.Reservation;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationCreateRequest {

    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private String request;

    public Reservation toEntity() {
        return Reservation.builder()
                .date(reservationDate)
                .time(reservationTime)
                .request(request)
                .build();
    }
}
