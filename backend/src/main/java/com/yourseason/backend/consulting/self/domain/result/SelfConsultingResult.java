package com.yourseason.backend.consulting.self.domain.result;

import com.yourseason.backend.common.domain.Tone;
import com.yourseason.backend.consulting.common.BestColorSet;
import com.yourseason.backend.consulting.common.Result;
import com.yourseason.backend.consulting.common.WorstColorSet;
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
@AttributeOverride(name = "id", column = @Column(name = "self_consulting_result_id"))
@Entity
public class SelfConsultingResult extends Result {

    @OneToMany(mappedBy = "selfTestResult", cascade = CascadeType.PERSIST)
    private List<Percentage> percentages = new ArrayList<>();

    @Builder
    public SelfConsultingResult(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate,
                                BestColorSet bestColorSet, WorstColorSet worstColorSet, Tone tone, List<Percentage> percentages) {
        super(id, createdDate, lastModifiedDate, deletedDate, bestColorSet, worstColorSet, tone);
        this.percentages = percentages;
    }
}
