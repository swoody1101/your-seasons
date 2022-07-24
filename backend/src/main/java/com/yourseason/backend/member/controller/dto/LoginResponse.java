package com.yourseason.backend.member.controller.dto;

import com.yourseason.backend.member.domain.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginResponse {

    private String nickname;
    private String imageUrl;
    private Role role;
    private String message;

    @Builder
    public LoginResponse(String nickname, String imageUrl, Role role, String message) {
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.role = role;
        this.message = message;
    }
}
