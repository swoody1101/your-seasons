package com.yourseason.backend.member.consultant.controller.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClosedDayListResponse {

    private Long closedDayId;
    private LocalDate date;
}
