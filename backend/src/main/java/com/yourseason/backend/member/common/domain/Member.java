package com.yourseason.backend.member.common.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.consulting.domain.Consulting;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Consulting> consultings = new ArrayList<>();

    public Member(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, boolean isActive,
                  String email, String password, String name, LocalDate birth, String nickname, String contact, String imageUrl, List<Consulting> consultings) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive);
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.nickname = nickname;
        this.contact = contact;
        this.imageUrl = imageUrl;
        this.consultings = consultings;
    }

    protected void updateProfile(String nickname, String contact, String imageUrl) {
        this.imageUrl = imageUrl;
        this.nickname = nickname;
        this.contact = contact;
    }

    protected void withdraw() {
        super.delete();
    }
}
