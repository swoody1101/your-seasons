package com.yourseason.backend.consulting.controller.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultingJoinRequest {

    private Long reservationId;
}
