package com.yourseason.backend.common.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "tone_id"))
@Entity
public class Tone extends BaseTimeEntity {

    @NotNull
    private String name;

    @Builder
    public Tone(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, String name) {
        super(id, createdTime, lastModifiedTime);
        this.name = name;
    }
}
