package com.yourseason.backend.consulting.common.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.common.domain.ColorSet;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "worst_color_set_id"))
@Entity
public class WorstColorSet extends BaseTimeEntity {

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "color_set_id")
    private ColorSet colorSet;

    @Builder
    public WorstColorSet(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, ColorSet colorSet) {
        super(id, createdTime, lastModifiedTime, deletedDate, true);
        this.colorSet = colorSet;
    }
}
