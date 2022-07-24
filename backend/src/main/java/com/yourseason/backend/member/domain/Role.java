package com.yourseason.backend.member.domain;

public enum Role {

    ROLE_CUSTOMER("고객"),
    ROLE_CONSULTANT("컨설턴트");

    private String value;

    Role(String value) {
        this.value = value;
    }
}
