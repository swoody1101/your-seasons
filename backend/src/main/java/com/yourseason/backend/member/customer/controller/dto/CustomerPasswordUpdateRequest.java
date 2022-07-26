package com.yourseason.backend.member.customer.controller.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustomerPasswordUpdateRequest {

    private String beforePassword;
    private String afterPassword;
}
