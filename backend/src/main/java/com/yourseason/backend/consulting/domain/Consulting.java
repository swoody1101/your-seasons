package com.yourseason.backend.consulting.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.consulting.domain.result.TestResult;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.customer.domain.Customer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "consulting_id"))
@Entity
public class Consulting extends BaseTimeEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_result_id")
    private TestResult testResult;

    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultant_id")
    private Consultant consultant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Builder
    public Consulting(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate,
                      boolean isActive, String comment, Consultant consultant, Customer customer) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive);
        this.comment = comment;
        this.consultant = consultant;
        this.customer = customer;
    }
}
