package com.yourseason.backend.member.consultant.controller.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantPasswordUpdateRequest {

    private String beforePassword;
    private String afterPassword;
}
