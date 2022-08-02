package com.yourseason.backend.member.consultant.controller.dto;

import com.yourseason.backend.member.consultant.domain.ClosedDay;
import com.yourseason.backend.member.consultant.domain.Consultant;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClosedDayRequest {

    private LocalDate closedDay;

    public ClosedDay toEntity(Consultant consultant) {
        return ClosedDay.builder()
                .date(closedDay)
                .consultant(consultant)
                .build();
    }
}
