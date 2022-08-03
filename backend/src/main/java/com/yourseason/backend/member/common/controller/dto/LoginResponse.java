package com.yourseason.backend.member.common.controller.dto;

import com.yourseason.backend.member.common.domain.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginResponse {

    private String name;
    private String nickname;
    private LocalDate birth;
    private String contact;
    private String email;
    private String imageUrl;
    private Role role;

    @Builder
    public LoginResponse(String name, String nickname, LocalDate birth, String contact, String email, String imageUrl, Role role) {
        this.name = name;
        this.nickname = nickname;
        this.birth = birth;
        this.contact = contact;
        this.email = email;
        this.imageUrl = imageUrl;
        this.role = role;
    }
}
