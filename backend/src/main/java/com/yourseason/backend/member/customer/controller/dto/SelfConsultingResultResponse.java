package com.yourseason.backend.member.customer.controller.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SelfConsultingResultResponse {

    private Long selfConsultingId;
    private LocalDate selfConsultingDate;
    private String tone;
    private List<String> bestColorSet;
    private List<String> worstColorSet;
    private List<PercentageResponse> percentages;
}
