package com.yourseason.backend.member.common.domain;

public enum Role {

    CUSTOMER("고객"),
    CONSULTANT("컨설턴트");

    private String value;

    Role(String value) {
        this.value = value;
    }
}
