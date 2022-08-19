package com.yourseason.backend.common.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "color_color_set_id"))
@Entity
public class ColorColorSet extends BaseTimeEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    private Color color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_set_id")
    private ColorSet colorSet;

    @Builder
    public ColorColorSet(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, Color color, ColorSet colorSet) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.color = color;
        this.colorSet = colorSet;
    }
}
