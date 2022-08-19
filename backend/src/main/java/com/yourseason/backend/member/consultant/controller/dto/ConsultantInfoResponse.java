package com.yourseason.backend.member.consultant.controller.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantInfoResponse {

    private String name;
    private String nickname;
    private LocalDate birth;
    private String contact;
    private String email;
    private String introduction;
    private int cost;
    private String imageUrl;
    private String consultingFileUrl;
    private String licenseName;
    private String licenseNumber;
    private List<ClosedDayListResponse> closedDays;
}
