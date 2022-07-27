package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
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

    @Builder
    public ClosedDay(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, boolean isActive, LocalDate date) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive);
        this.date = date;
    }
}
