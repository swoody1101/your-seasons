package com.yourseason.backend.consulting.self.domain.result;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.common.domain.Tone;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "percentage_id"))
@Entity
public class Percentage extends BaseTimeEntity {

    private int percentage;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tone_id")
    private Tone tone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "self_consulting_result_id")
    private SelfConsultingResult selfConsultingResult;

    @Builder
    public Percentage(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate,
                      int percentage, Tone tone, SelfConsultingResult selfConsultingResult) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.percentage = percentage;
        this.tone = tone;
        this.selfConsultingResult = selfConsultingResult;
    }

    public void addSelfConsultingResult(SelfConsultingResult selfConsultingResult) {
        this.selfConsultingResult = selfConsultingResult;
    }
}
