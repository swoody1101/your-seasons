package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "license_id"))
@Entity
public class License extends BaseTimeEntity {

    private String name;

    @OneToMany(mappedBy = "license")
    private List<Consultant> consultants = new ArrayList<>();

    @Builder
    public License(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, boolean isActive, String name, List<Consultant> consultants) {
        super(id, createdDate, lastModifiedDate, deletedDate, isActive);
        this.name = name;
        this.consultants = consultants;
    }
}
