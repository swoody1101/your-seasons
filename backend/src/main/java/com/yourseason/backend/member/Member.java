package com.yourseason.backend.member;

import com.yourseason.backend.common.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@MappedSuperclass
public abstract class Member extends BaseTimeEntity {

    @NotNull
    private String email;

    @NotNull
    @Size(min = 6, max = 20)
    private String password;

    @NotNull
    @Size(min = 2, max = 20)
    private String name;

    @NotNull
    private LocalDate birth;

    @NotNull
    @Size(min = 2, max = 10)
    private String nickname;

    @NotNull
    @Size(min = 12, max = 13)
    private String contact;

    private String imageUrl;
}
