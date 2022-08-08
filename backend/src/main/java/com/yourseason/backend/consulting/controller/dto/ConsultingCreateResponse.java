package com.yourseason.backend.consulting.controller.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultingCreateResponse {

    private String sessionId;
    private LocalDateTime sessionCreatedTime;
}
