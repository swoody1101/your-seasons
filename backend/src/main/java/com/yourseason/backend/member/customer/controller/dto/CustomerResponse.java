package com.yourseason.backend.member.customer.controller.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustomerResponse {

    private String name;
    private String nickname;
    private LocalDate birth;
    private String contact;
    private String email;
    private String imageUrl;
}
