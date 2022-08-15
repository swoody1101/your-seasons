package com.yourseason.backend.consulting.consultant.controller.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultingRequest {

    private Long reservationId;
}
