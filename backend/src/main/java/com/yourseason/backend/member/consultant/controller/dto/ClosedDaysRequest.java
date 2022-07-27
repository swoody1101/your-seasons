package com.yourseason.backend.member.consultant.controller.dto;

import com.yourseason.backend.member.consultant.domain.ClosedDay;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClosedDaysRequest {

    private List<LocalDate> closedDays;

    public List<ClosedDay> toEntityList() {
        return closedDays.stream()
                .map(closedDay -> ClosedDay.builder()
                        .date(closedDay)
                        .build())
                .collect(Collectors.toList());
    }
}
