package com.yourseason.backend.reservation.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.reservation.controller.dto.ReservationCreateRequest;
import com.yourseason.backend.reservation.controller.dto.ReservationCreateResponse;
import com.yourseason.backend.reservation.service.ReservationService;
import com.yourseason.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/{consultantId}")
    public ResponseEntity<ReservationCreateResponse> createReservation(@RequestHeader("Authorization") String token,
                                                                       @PathVariable Long consultantId,
                                                                       @RequestBody ReservationCreateRequest reservationCreateRequest) {
        ReservationCreateResponse response = reservationService.createReservation(JwtUtil.getMemberRole(token), JwtUtil.getMemberId(token),
                consultantId, reservationCreateRequest);
        log.info("예약 등록 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Message> deleteReservation(@RequestHeader("Authorization") String token,
                                                     @PathVariable Long reservationId) {
        Message message = reservationService.deleteReservation(JwtUtil.getMemberId(token), reservationId);
        log.info("예약 삭제 성공");
        return ResponseEntity.ok()
                .body(message);
    }
}
