package com.yourseason.backend.common.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "color")
    private List<ColorColorSet> colorColorSets = new ArrayList<>();

    @Builder
    public Color(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, String hex, Tone tone, List<ColorColorSet> colorColorSets) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.hex = hex;
        this.tone = tone;
        this.colorColorSets = colorColorSets;
    }
}
