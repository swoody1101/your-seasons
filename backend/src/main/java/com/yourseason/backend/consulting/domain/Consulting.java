package com.yourseason.backend.consulting.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.consulting.domain.result.TestResult;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "consulting_id"))
@Entity
public class Consulting extends BaseTimeEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_result_id")
    private TestResult testResult;

    private String comment;
    private String consultingFile;

    @Builder
    public Consulting(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, String comment, String consultingFile) {
        super(id, createdTime, lastModifiedTime);
        this.comment = comment;
        this.consultingFile = consultingFile;
    }
}
