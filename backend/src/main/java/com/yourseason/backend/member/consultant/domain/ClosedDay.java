package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "closed_day_id"))
@Entity
public class ClosedDay extends BaseTimeEntity {

    @NotNull
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultant_id")
    private Consultant consultant;

    @Builder
    public ClosedDay(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, boolean isActive, LocalDate date, Consultant consultant) {
        super(id, createdDate, lastModifiedDate, deletedDate, isActive);
        this.date = date;
        this.consultant = consultant;
    }
}
