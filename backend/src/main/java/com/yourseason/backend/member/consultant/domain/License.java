package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "license_id"))
@Entity
public class License extends BaseTimeEntity {

    private String name;

    @Builder
    public License(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, boolean isActive, String name) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive);
        this.name = name;
    }
}
