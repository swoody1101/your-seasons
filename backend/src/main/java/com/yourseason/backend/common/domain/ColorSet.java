package com.yourseason.backend.common.domain;

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
@AttributeOverride(name = "id", column = @Column(name = "color_set_id"))
@Entity
public class ColorSet extends BaseTimeEntity {

    @OneToMany(mappedBy = "colorSet", cascade = CascadeType.PERSIST)
    private List<ColorColorSet> colorColorSets = new ArrayList<>();

    @Builder
    public ColorSet(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
    }

    @Builder
    public ColorSet(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, List<ColorColorSet> colorColorSets) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.colorColorSets = colorColorSets;
    }

    public void addColor(Color color) {
        ColorColorSet colorColorSet = getNewColorColorSet(color);
        colorColorSets.add(colorColorSet);
        color.addColorColorSet(colorColorSet);
    }

    private ColorColorSet getNewColorColorSet(Color color) {
        return ColorColorSet.builder()
                .color(color)
                .colorSet(this)
                .build();
    }
}
