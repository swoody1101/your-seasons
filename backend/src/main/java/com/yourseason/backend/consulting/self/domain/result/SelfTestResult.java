package com.yourseason.backend.consulting.self.domain.result;

import com.yourseason.backend.common.domain.Tone;
import com.yourseason.backend.consulting.common.BestColorSet;
import com.yourseason.backend.consulting.common.TestResult;
import com.yourseason.backend.consulting.common.WorstColorSet;
import com.yourseason.backend.consulting.self.domain.percentage.Percentage;
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
@AttributeOverride(name = "id", column = @Column(name = "self_test_result_id"))
@Entity
public class SelfTestResult extends TestResult {

    @OneToMany(mappedBy = "selfTestResult", cascade = CascadeType.PERSIST)
    private List<Percentage> percentages = new ArrayList<>();

    @Builder
    public SelfTestResult(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate,
                          BestColorSet bestColorSet, WorstColorSet worstColorSet, Tone tone, List<Percentage> percentages) {
        super(id, createdDate, lastModifiedDate, deletedDate, bestColorSet, worstColorSet, tone);
        this.percentages = percentages;
    }
}
