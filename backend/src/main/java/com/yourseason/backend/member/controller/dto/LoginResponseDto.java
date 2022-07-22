package com.yourseason.backend.member.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginResponseDto {

    private String nickname;
    private String image;

    @Builder
    public LoginResponseDto(String nickname, String image) {
        this.nickname = nickname;
        this.image = image;
    }
}
