package com.yourseason.backend.member.domain.consultant.controller.dto;

import com.yourseason.backend.member.domain.consultant.domain.Consultant;
import lombok.*;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultantSignupRequest {

    private String email;
    private String password;
    private String name;
    private LocalDate birth;
    private String nickname;
    private String contact;
    private Long licenseId;
    private String licenseNumber;

    @Builder
    public ConsultantSignupRequest(String email, String password, String name, LocalDate birth,
                                   String nickname, String contact, Long licenseId, String licenseNumber) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.nickname = nickname;
        this.contact = contact;
        this.licenseId = licenseId;
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
