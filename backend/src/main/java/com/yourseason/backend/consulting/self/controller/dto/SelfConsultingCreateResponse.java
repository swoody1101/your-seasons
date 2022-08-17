package com.yourseason.backend.consulting.self.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SelfConsultingCreateResponse {

    private Long selfConsultingId;
}
