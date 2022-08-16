package com.yourseason.backend.consulting.consultant.domain.result;

import com.yourseason.backend.consulting.common.domain.BestColorSet;
import com.yourseason.backend.consulting.common.domain.WorstColorSet;
import com.yourseason.backend.common.domain.Tone;
import com.yourseason.backend.consulting.common.domain.Result;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "consulting_result_id"))
@Entity
public class ConsultingResult extends Result {

    private String consultingComment;
    private String consultingFile;

    @Builder
    public ConsultingResult(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate,
                            BestColorSet bestColorSet, WorstColorSet worstColorSet, Tone tone, String consultingComment, String consultingFile) {
        super(id, createdDate, lastModifiedDate, deletedDate, bestColorSet, worstColorSet, tone);
        this.consultingComment = consultingComment;
        this.consultingFile = consultingFile;
    }
}
