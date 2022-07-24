package com.yourseason.backend.member.domain;

import com.yourseason.backend.member.controller.dto.LoginResponse;
import lombok.Getter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

@Getter
public class SecurityMember extends User {

    private Member member;
    private Role role;

    public SecurityMember(Member member, Role role) {
        super(member.getEmail(), member.getPassword(),
                AuthorityUtils.createAuthorityList(role.toString()));
    }
}
