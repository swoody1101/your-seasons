package com.yourseason.backend.consulting.common.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.common.domain.Tone;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@MappedSuperclass
public abstract class Result extends BaseTimeEntity {

    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "best_color_set_id")
    private BestColorSet bestColorSet;

    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "worst_color_set_id")
    private WorstColorSet worstColorSet;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tone_id")
    private Tone tone;

    public Result(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate,
                  BestColorSet bestColorSet, WorstColorSet worstColorSet, Tone tone) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.bestColorSet = bestColorSet;
        this.worstColorSet = worstColorSet;
        this.tone = tone;
    }
}
