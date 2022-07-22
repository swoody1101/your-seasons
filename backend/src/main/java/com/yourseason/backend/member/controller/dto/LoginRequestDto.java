package com.yourseason.backend.member.controller.dto;

import lombok.*;

@Getter
@NoArgsConstructor
public class LoginRequestDto {

    private String email;
    private String password;

    @Builder
    public LoginRequestDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
