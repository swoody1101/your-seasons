package com.yourseason.backend.member.consultant.controller.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantInfoResponse {

    String name;
    String nickname;
    LocalDate birth;
    String contact;
    String email;
    String introduction;
    String cost;
    String imageUrl;
    String consultingFileUrl;
    String licenseName;
    String licenseNumber;
    List<ClosedDayListResponse> closedDays;
}
