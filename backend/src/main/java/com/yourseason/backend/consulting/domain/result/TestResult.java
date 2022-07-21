package com.yourseason.backend.consulting.domain.result;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.common.domain.Tone;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "test_result_id"))
@Entity
public class TestResult extends BaseTimeEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "best_color_set_id")
    private BestColorSet bestColorSet;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "best_color_set_id")
    private WorstColorSet wortColorSet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tone_id")
    private Tone tone;

    @Builder
    public TestResult(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime,
                      BestColorSet bestColorSet, WorstColorSet wortColorSet, Tone tone) {
        super(id, createdTime, lastModifiedTime);
        this.bestColorSet = bestColorSet;
        this.wortColorSet = wortColorSet;
        this.tone = tone;
    }
}
