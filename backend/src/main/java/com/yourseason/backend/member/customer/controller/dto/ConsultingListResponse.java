package com.yourseason.backend.member.customer.controller.dto;

import com.yourseason.backend.consulting.domain.result.BestColorSet;
import com.yourseason.backend.consulting.domain.result.WorstColorSet;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultingListResponse {

    private Long consultantId;
    private Long consultingId;
    private String consultantNickname;
    private String consultantImageUrl;
    private LocalDate consultingDate;
    private String tone;
    private List<ColorSetResponse> bestColorSet;
    private List<ColorSetResponse> worstColorSet;
    private String resultImageUrl;
    private String comment;
    private boolean hasReview;
}
