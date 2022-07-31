package com.yourseason.backend.member.customer.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ColorSetResponse {

    private String hex;
}
