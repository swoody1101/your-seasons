package com.yourseason.backend.consulting.common.result;

import com.yourseason.backend.consulting.common.BestColorSet;
import com.yourseason.backend.consulting.common.WorstColorSet;
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
@AttributeOverride(name = "id", column = @Column(name = "test_result_id"))
@Entity
public class ConsultantTestResult extends TestResult {

    private String consultingComment;
    private String consultingFile;

    public ConsultantTestResult(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate,
                                BestColorSet bestColorSet, WorstColorSet worstColorSet, Tone tone, String consultingComment, String consultingFile) {
        super(id, createdDate, lastModifiedDate, deletedDate, bestColorSet, worstColorSet, tone);
        this.consultingComment = consultingComment;
        this.consultingFile = consultingFile;
    }
}
