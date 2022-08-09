package com.yourseason.backend.member.common.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class EmailAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String email;

    @NotNull
    private String authToken;

    @Builder
    public EmailAuth(String email, String authToken) {
        this.email = email;
        this.authToken = authToken;
    }

    public void updateEmailAuthToken(String authToken) {
        this.authToken = authToken;
    }
}
