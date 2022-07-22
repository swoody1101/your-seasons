package com.yourseason.backend.member.domain.customer.controller.dto;

import com.yourseason.backend.member.domain.customer.domain.Customer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustomerSignupRequest {

    private String email;
    private String password;
    private String name;
    private LocalDate birth;
    private String nickname;
    private String contact;
    // 역할 어떻게 하지!

    @Builder
    public CustomerSignupRequest(String email, String password, String name, LocalDate birth, String nickname, String contact) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.nickname = nickname;
        this.contact = contact;
    }

    public Customer toEntity() {
        return Customer.builder()
                .email(email)
                .password(password)
                .name(name)
                .birth(birth)
                .nickname(nickname)
                .contact(contact)
                .build();
    }
}
