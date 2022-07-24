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
    public ColorSet(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, boolean isActive) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive);
    }
}
