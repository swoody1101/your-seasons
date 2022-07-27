package com.yourseason.backend.common.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "color_id"))
@Entity
public class Color extends BaseTimeEntity {

    @NotNull
    private String hex;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tone_id")
    private Tone tone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_set_id")
    private ColorSet colorSet;

    @Builder
    public Color(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, boolean isActive, String hex, Tone tone) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive);
        this.hex = hex;
        this.tone = tone;
    }
}
