package com.yourseason.backend.common.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
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
    public Color(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, boolean isActive, String hex, Tone tone, ColorSet colorSet) {
        super(id, createdDate, lastModifiedDate, deletedDate, isActive);
        this.hex = hex;
        this.tone = tone;
        this.colorSet = colorSet;
    }
}
