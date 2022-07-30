package com.yourseason.backend.common.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "color_set_id"))
@Entity
public class ColorSet extends BaseTimeEntity {

    @OneToMany
    private List<Color> colors = new ArrayList<>();

    @Builder
    public ColorSet(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, List<Color> colors) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.colors = colors;
    }
}
