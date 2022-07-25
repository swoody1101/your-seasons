package com.yourseason.backend.member.consultant.controller.dto;

import com.yourseason.backend.member.consultant.domain.Consultant;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantSignupRequest {

    private String email;
    private String password;
    private String name;
    private LocalDate birth;
    private String nickname;
    private String contact;
    private String licenseName;
    private String licenseNumber;

    @Builder
    public ConsultantSignupRequest(String email, String password, String name, LocalDate birth,
                                   String nickname, String contact, String licenseName, String licenseNumber) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.nickname = nickname;
        this.contact = contact;
        this.licenseName = licenseName;
        this.licenseNumber = licenseNumber;
    }

    public Consultant toEntity() {
        return Consultant.builder()
                .email(email)
                .password(password)
                .name(name)
                .birth(birth)
                .nickname(nickname)
                .contact(contact)
                .licenseNumber(licenseNumber)
                .build();
    }
}
