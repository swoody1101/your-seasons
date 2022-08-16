package com.yourseason.backend.consulting.self.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.consulting.self.domain.result.SelfConsultingResult;
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
    @JoinColumn(name = "self_consulting_result_id")
    private SelfConsultingResult selfConsultingResult;

    @Builder
    public SelfConsulting(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate,
                          Customer customer, SelfConsultingResult selfConsultingResult) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.customer = customer;
        this.selfConsultingResult = selfConsultingResult;
    }

    public void done() {
        delete();
    }

    public void updateResult(SelfConsultingResult selfConsultingResult) {
        this.selfConsultingResult = selfConsultingResult;
    }
}
