package com.yourseason.backend.consulting.self.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.consulting.self.domain.result.SelfTestResult;
import com.yourseason.backend.member.customer.domain.Customer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "self_consulting_id"))
@Entity
public class SelfConsulting extends BaseTimeEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "self_test_result_id")
    private SelfTestResult selfTestResult;

    @Builder
    public SelfConsulting(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate,
                          Customer customer, SelfTestResult selfTestResult) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.customer = customer;
        this.selfTestResult = selfTestResult;
    }
}
