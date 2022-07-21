package com.yourseason.backend.member;

import com.yourseason.backend.common.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.MappedSuperclass;
import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@MappedSuperclass
public abstract class Member extends BaseTimeEntity {

    private String email;
    private String password;
    private String name;
    private LocalDate birth;
    private String nickname;
    private String contact;
    private String imageUrl;
}
