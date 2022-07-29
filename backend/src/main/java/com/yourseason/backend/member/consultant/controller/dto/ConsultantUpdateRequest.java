package com.yourseason.backend.member.consultant.controller.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantUpdateRequest {

    private String nickname;
    private String contact;
    private String imageUrl;
    private String introduction;
    private String cost;
}
