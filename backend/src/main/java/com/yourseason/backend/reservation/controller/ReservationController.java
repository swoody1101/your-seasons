package com.yourseason.backend.reservation.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.reservation.controller.dto.ReservationCreateRequest;
import com.yourseason.backend.reservation.controller.dto.ReservationCreateResponse;
import com.yourseason.backend.reservation.service.ReservationService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/{consultantId}")
    public ResponseEntity<ReservationCreateResponse> createReservation(@RequestHeader("Authorization") String token,
                                                                       @PathVariable Long consultantId,
                                                                       @RequestBody ReservationCreateRequest reservationCreateRequest) {
        return ResponseEntity.ok()
                .body(reservationService.createReservation(JwtUtil.getMemberId(token), consultantId, reservationCreateRequest));
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Message> deleteReservation(@RequestHeader("Authorization") String token,
                                                     @PathVariable Long reservationId) {
        return ResponseEntity.ok()
                .body(reservationService.deleteReservation(JwtUtil.getMemberId(token), reservationId));
    }
}
