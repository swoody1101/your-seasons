package com.yourseason.backend.reservation.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Message> deleteReservation(@PathVariable Long reservationId) {
        return ResponseEntity.ok()
                .body(reservationService.deleteReservation(0L, reservationId));
    }
}
