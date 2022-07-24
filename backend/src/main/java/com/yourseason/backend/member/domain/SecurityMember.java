package com.yourseason.backend.member.domain;

import com.yourseason.backend.member.controller.dto.LoginResponse;
import lombok.Getter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

@Getter
public class SecurityMember extends User {

    private LoginResponse loginResponse;

    public SecurityMember(Member loginResponse) {
        super(loginResponse.getEmail(), loginResponse.getPassword(),
                AuthorityUtils.createAuthorityList(loginResponse.getRole().toString()));
        this.loginResponse = loginResponse;
    }
}
